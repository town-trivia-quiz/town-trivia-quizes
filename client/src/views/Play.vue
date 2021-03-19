<template>
  <section id="main-page">
    <div class="container-fluid mt-5" style="height: 1000px;">
      <div class="row">
        <div class="col-8" style="background-color: #ccd5ae ;">
          <div class="row justify-content-center mt-3 mb-3">
            <div class="col">
              <div class="card text-center">
                <div class="card-body">
                  <h3>Soal No. {{ questionNumber }}</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-2">
              <div class="card">
                <div class="card-body">
                  <h4>SCORE : {{ score }}</h4>
                </div>
              </div>
            </div>
            <div class="col-10">
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
                      <div class="col-10">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Your answer.."
                          aria-label="answer"
                          v-model="answer"
                        />
                      </div>
                      <div class="col-2">
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

        <div class="col-4" style="background-color: #faedcd;">
          <div class="card mt-3 mb-1">
            <div class="card-body text-center">
              <h3>Trivia Messanger</h3>
            </div>
          </div>

          <div class="card mt-3 overflow-auto" style="max-height: 70vh;">
            <div class="card-body">
              <Chat v-for="(chat, i) in chats" :key="i" :chat="chat" />
            </div>
          </div>
          <hr />
          <div class="row mt-2">
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                placeholder="Chat here.."
                aria-label="answer"
                v-model="chatting"
              />
            </div>
            <div class="col-2">
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
import { mapState } from "vuex";
import Chat from "@/components/Chat";
import swal from "sweetalert";

export default {
  name: "Play",
  data() {
    return {
      answer: "",
      questionNumber: 1,
      score: 0,
      chatting: "",
      pemenang: false
    };
  },
  components: {
    Chat
  },
  methods: {
    getAnswer() {
      const payload = {
        answer: this.answer,
        questionNumber: this.questionNumber
      };
      this.$store
        .dispatch("checkAnswer", payload)
        .then(data => {
          swal("Hooray! Your answer is correct!", {
            icon: "success"
          });
          this.checkWinner();
          this.finalCondition();
          this.nextQuestion();
          this.getQuestion();
        })
        .catch(err => {
          swal("Hooo! Your answer is incorrect!", "", "error");
        });
      this.answer = "";
    },
    getQuestion() {
      this.$store.dispatch("searchQuestion", this.questionNumber);
    },
    nextQuestion() {
      this.questionNumber++;
      this.score += 10;
    },
    checkWinner() {
      if (this.score === 10) {
        this.pemenang = true;
      }
    },
    finalCondition() {
      if (this.pemenang) {
        const name = this.username;
        this.$socket.emit("getWiner", this.pemenang);
        swal(`Congratulations ${name}, You are the winner!!!!`, {
          icon: "success"
        });
        this.$router.push("/");
      }
    },
    insertChatting() {
      const payload = {
        message: this.chatting,
        username: this.username
      };
      this.$store.commit("insertChat", payload);
      this.$socket.emit("replyMessage", payload);
      this.chatting = "";
    }
  },
  sockets: {
    sendAll(message) {
      this.$store.commit("insertChat", message);
    },
    gameEnd(data) {
      const name = this.username;
      swal(`You loseeeeee ${name}!!!! The other player has win`, {
        icon: "error"
      });
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["question", "chats", "username"])
  },
  created() {
    this.getQuestion();
  }
};
</script>

<style scoped></style>
