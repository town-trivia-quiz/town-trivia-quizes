<template>
  <section id="main-page">
    <div class="container-fluid mt-3" >
      <div class="row">
        <div class="col-md-8" style="background-color: #caf0f8 ;">
          <div class="row justify-content-center mt-3 mb-3">
            <div class="col-md" >
              <div class="card text-center text-white" style="background-color: #00b4d8">
                <div class="card-body">
                  <h3>Soal No. {{ questionNumber }}</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="row text-center">
            <div class="col-md-2">
              <div class="card mb-2 text-white" style="background-color: #e63946">
                <div class="card-body">
                  <h5>SCORE : </h5>
                  <div class="row">
                    <h1>{{ score }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-10">
              <div class="row justify-content-center mb-5">
                <div
                  class="card"
                  style="width: 40rem; background-color: #fefae0 ;"
                >
                  <img
                    :src="question.imageUrl"
                    class="card-img-top mt-2"
                    alt="..."
                  />
                  <div class="card-body">
                    <h4>Pertanyaan:</h4>
                    <blockquote class="blockquote">
                      <p>{{ question.exercise }}</p>
                    </blockquote>
                    <div class="row">
                      <div class="col-md-10 mt-2 mb-2">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Your answer.."
                          aria-label="answer"
                          v-model="answer"
                        />
                      </div>
                      <div class="col-md-2 mt-2">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          @click.prevent="getAnswer"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4" style="background-color: #faedcd;">
          <div class="card mt-3 mb-1 text-white" style="background-color: #cb997e">
            <div class="card-body text-center">
              <h3>Trivia Messenger</h3>
            </div>
          </div>

          <div class="card mt-3 overflow-auto" style="max-height: 70vh; height: 70vh; background-color: #ddbea9">
            <div class="card-body">
              <Chat v-for="(chat, i) in chats" :key="i" :chat="chat" />
            </div>
          </div>
          <hr />
          <div class="row mt-2">
            <div class="col-md-8 mt-2 mb-2">
              <input
                type="text"
                class="form-control"
                placeholder="Chat here.."
                aria-label="answer"
                v-model="chatting"
              />
            </div>
            <div class="col-md-2 mt-2 mb-2">
              <button
                type="button"
                class="btn btn-secondary"
                @click.prevent="insertChatting"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Chat from '@/components/Chat'
import swal from 'sweetalert'

export default {
  name: 'Play',
  data () {
    return {
      answer: '',
      questionNumber: 1,
      score: 0,
      chatting: '',
      pemenang: false
    }
  },
  components: {
    Chat
  },
  methods: {
    getAnswer () {
      const payload = {
        answer: this.answer,
        questionNumber: this.questionNumber
      }
      this.$store
        .dispatch('checkAnswer', payload)
        .then(data => {
          swal('Hooray! Your answer is correct!', {
            icon: 'success'
          })
          this.checkWinner()
          this.finalCondition()
          this.nextQuestion()
          this.getQuestion()
        })
        .catch(() => {
          swal('Hooo! Your answer is incorrect!', '', 'error')
        })
      this.answer = ''
    },
    getQuestion () {
      this.$store.dispatch('searchQuestion', this.questionNumber)
    },
    nextQuestion () {
      this.questionNumber++
      this.score += 10
    },
    checkWinner () {
      if (this.score === 90) {
        this.pemenang = true
      }
    },
    finalCondition () {
      if (this.pemenang) {
        const name = this.username
        this.$socket.emit('getWiner', this.pemenang)
        swal(`Congratulations ${name}, You are the winner!!!!`, {
          icon: 'success'
        })
        this.$router.push('/')
      }
    },
    insertChatting () {
      const payload = {
        message: this.chatting,
        username: this.username
      }
      this.$store.commit('insertChat', payload)
      this.$socket.emit('replyMessage', payload)
      this.chatting = ''
    }
  },
  sockets: {
    sendAll (message) {
      this.$store.commit('insertChat', message)
    },
    gameEnd (data) {
      const name = this.username
      swal(`You loseeeeee ${name}!!!! The other player has win`, {
        icon: 'error'
      })
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['question', 'chats', 'username'])
  },
  created () {
    this.getQuestion()
  }
}
</script>

<style scoped></style>
