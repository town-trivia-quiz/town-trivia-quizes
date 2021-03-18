import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    question: "",
    chats: []
  },
  mutations: {
    addUser(state, payload) {
      state.username = payload;
    },
    getQuestion(state, payload) {
      state.question = payload;
    },
    insertChat(state, payload) {
      state.chats.push(payload);
    }
  },
  actions: {
    checkAnswer(context, payload) {
      const { answer, questionNumber } = payload;
      return axios({
        url: "/questions",
        method: "post",
        data: {
          id: questionNumber,
          answer
        }
      });
    },
    searchQuestion(context, id) {
      axios({
        url: `/questions/${id}`,
        method: "get",
        data: {
          id
        }
      })
        .then(question => {
          context.commit("getQuestion", question.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
