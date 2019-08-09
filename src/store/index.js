import Vue from "vue";
import Vuex from "vuex";
import { DB } from "@/config/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songs: [],
    fieldCount: 0,
    songsFromDatabase: []
  },
  getters: {
    GET_SONG_LIST: state => state.songs,
    GET_ALL_SONGS: state => state.songsFromDatabase,
    GET_FIELD_NUMS: state => state.fieldCount
  },
  mutations: {
    ADD_SONGS_FROM_DB(state, payload) {
      state.songsFromDatabase.push(payload);
    },
    PUSH_SONG_TO_LIST(state, payload) {
      state.songs.push(payload);
    },
    REMOVE_SONG_FROM_LIST(state, payload) {
      const songIndex = state.songs.findIndex(song => song === payload);
      console.log(songIndex);
      state.songs.splice(songIndex, 1);
      console.log(state.songs);
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
    },
    async Edit_Song_Details(payload) {
      try {
        console.log(payload);
        await DB.collection("songs")
          .doc(payload.id)
          .update(payload)
          .then(() => {
            console.lof(payload.title + " has been updated!");
          });
      } catch (error) {
        throw error;
      }
    },
    async Get_All_Songs({ commit }) {
      let songQuerySnapshot = await DB.collection("songs").get();
      songQuerySnapshot.forEach(doc => {
        let song = doc.data();
        song.id = doc.id;
        commit("ADD_SONGS_FROM_DB", song);
      });
    }
  }
});
