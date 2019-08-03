import Vue from "vue";
import Vuex from "vuex";
import { DB } from "@/config/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songs: [],
    fieldCount: 0
  },
  getters: {
    GET_SONG_LIST: state => state.songs,
    GET_FIELD_NUMS: state => state.fieldCount
  },
  mutations: {
    PUSH_SONG_TO_LIST(state, payload) {
      state.songs.push(payload);
    },
    REMOVE_SONG_FROM_LIST(state, payload) {
      const songIndex = state.songs.findIndex(song => song === payload);
      console.log(songIndex);
      state.songs.splice(songIndex, 1);
      console.log(state.songs);
    },
    INCREMENT_FIELD_COUNT(state) {
      state.fieldCount += 1;
    },
    DECREMENT_FIELD_COUNT(state) {
      state.fieldCount -= 1;
    }
  },
  actions: {
    async Add_Song_To_Database(payload) {
      try {
        console.log(payload);
        await DB.collection("songs")
          .doc()
          .set(payload)
          .then(() => {
            console.log(payload.title + "has been added!");
          });
      } catch (error) {
        throw error;
      }
    }
  }
});
