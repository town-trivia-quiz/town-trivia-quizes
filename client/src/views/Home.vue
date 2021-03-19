<template>
  <!-- welcome-page -->
  <section id="first-page">
    <div class="container" style="margin-top: 10rem;">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="card" style="background-color: #ccd5ae ;">
            <h5 class="card-header text-center">
              Welcome to Town-Trivia-Quizes!
            </h5>
            <div class="card-body jus">
              <div class="row justify-content-center">
                <div class="col-5">
                  <img src="@/assets/trivia-logo-small.png" alt="" />
                </div>
              </div>
              <div class="row justify-content-center mt-2">
                <div class="col-7">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Input Your Name.."
                    aria-label=".form-control-lg example"
                    v-model="username"
                  />
                </div>
              </div>
              <div class="row justify-content-center mt-2">
                <div class="col-3">
                  <a href="#" class="btn btn-success" @click.prevent="login"
                    >Let's Start!</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    login () {
      this.$store.commit('addUser', this.username)
      this.username = ''
      this.$router.push('/play')
    }
  }
}
</script>

<style></style>
