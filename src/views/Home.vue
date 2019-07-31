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

      <v-layout row v-for="n in numOfSongs" :key="n">
        <SongTextbox :songNumber="n"/>
      </v-layout>

      <v-layout row align-baseline justify-center mt-5>
        <v-flex xs3>
          <v-btn color="secondary">
            <div>GENERATE LYRICS LIST</div>
            <v-icon right>save_alt</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn color="primary" @click="addFields">
            <div>ADD A SONG</div>
            <v-icon right>add_circle_outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SongTextbox from "@/components/SongTextbox.vue"


export default {
  name: "home",
  components: {
    SongTextbox,
  },
  computed: {
    numOfSongs() {
      let numberOfSongs = this.$store.getters.GET_SONGS_ON_LIST;
      return numberOfSongs.length + 1;
    }
  },
  methods: {
    addSong(song) {
      this.$store.commit('PUSH_SONG_TO_LIST', song);
    },
    addFields() {
      this.$store.commit('INCREMENT_FIELD_COUNT');
    }
  },
};
</script>
