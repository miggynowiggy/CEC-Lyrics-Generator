<template>
  <div class="home">
    <v-container>
      
      <v-layout row>
        <v-flex xs12>
          <h1 class="primary--text font-weight-bold">LYRICS GENERATOR</h1>
        </v-flex>
      </v-layout>
      
      <v-layout row align-center justify-center mb-5>
        <div class="body-1 font-italic">
          For instructions, please see <b>"Instructions"</b> tab.
        </div>
      </v-layout>

      <v-layout row v-if="isSongListEmpty" justify-center align-center mt-5 mb-5>
        <div class="primary--text headline">NO SONGS YET!!</div>
      </v-layout>

      <v-layout row align-center justify-center v-else v-for="(song, index) in songList" :key="song">
        <v-flex xs6>
          <songList :songTitle="song" :songNumber="index"/>
        </v-flex>
      </v-layout>

      <v-layout row align-baseline justify-center mt-4>
        <v-flex xs4>
          <v-text-field
            v-model="song"
            placeholder="Enter the title or artist of the desired song."
            outlined
            rounded
            color="primary"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 align-content-center>
            <v-btn color="primary" :disabled="song === ''" @click="addSong(song)">
                <v-icon medium>done_outline</v-icon>
            </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row align-baseline justify-center mt-5>
        <v-flex xs6>
          <v-btn color="secondary darken-2" :disabled="songList.length <= 0">
            <div>GENERATE LYRICS LIST</div>
            <v-icon right>save_alt</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SongTextbox from "@/components/SongTextbox.vue"
import songList from "@/components/SongList.vue"


export default {
  name: "home",
  components: {
    SongTextbox,
    songList
  },
  data() {
    return {
      song: ""
    }
  },
  computed: {
    numOfSongs() {
      let numberOfSongs = this.$store.getters.GET_SONG_LIST;
      return numberOfSongs.length + 1;
    },
    songList() {
      return this.$store.getters.GET_SONG_LIST;
    },
    isSongListEmpty() {
      if(this.songList.length <= 0) return true;
      else return false;
    },
  },
  methods: {
    addSong(song) {
      this.$store.commit('PUSH_SONG_TO_LIST', song);
      this.song = "";
    },
    addFields() {
      this.$store.commit('INCREMENT_FIELD_COUNT');
    },
    generateLyrics() {
      console.log(this.songList);
    },
  },
};
</script>
