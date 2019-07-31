import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songs: [],
    fieldCount: 0
  },
  getters: {
    GET_SONGS_ON_LIST: state => state.songs,
    GET_FIELD_NUMS: state => state.fieldCount
  },
  mutations: {
    PUSH_SONG_TO_LIST(state, payload) {
      state.songs.push(payload);
    },
    INCREMENT_FIELD_COUNT(state) {
      state.fieldCount += 1;
    },
    DECREMENT_FIELD_COUNT(state) {
      state.fieldCount -= 1;
    }
  },
  actions: {}
});
