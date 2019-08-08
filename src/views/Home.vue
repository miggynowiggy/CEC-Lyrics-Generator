<template>
  <div class="home">
    <v-container>
      <v-layout row v-if="isSongListEmpty" justify-center align-center mt-5 mb-5>
        <div class="primary--text headline">NO SONGS YET!!</div>
      </v-layout>

      <v-layout row align-center justify-center v-else v-for="(song, index) in songList" :key="song.id">
        <v-flex xs6>
          <songList :songTitle="song.title" :songNumber="index"/>
        </v-flex>
      </v-layout>

      <v-layout row align-baseline justify-center mt-5 mb-5>
        <v-flex xs10>
          <v-btn color="secondary darken-2" :disabled="songList.length <= 0" @click="generateLyrics">
            <div>GENERATE LYRICS LIST</div>
            <v-icon right>save_alt</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row align-baseline justify-center mt-5>
        <v-flex xs6>
          <v-autocomplete
            v-model="selectedSong"
            :loading="loading"
            :items="songsFromDB"
            :filter="customFilter"
            :item-text="title"
            :item-value="item"
            item-color="primary"
            cache-items
            hide-details
            hide-no-data
            hide-selected
            no-data-text
            clearable
            placeholder="Enter the title or artist of the desired song."
            outlined
            rounded
            @input="openPreview"
          ></v-autocomplete>
          <!--<v-text-field
            outlined
            v-model="search"
            rounded
            label="Song"
            placeholder="Type in the Title or the Artist of your desired song..."
          ></v-text-field>-->
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-layout row align-center justify-center>
        <v-dialog
          v-model="dialog"
          scrollable
          max-width="400px"
        >
          <v-card class="pa-3">
            <v-card-title>
              <v-layout row wrap justify-center align-center>
                <v-flex xs12 class="font-weight-bold headline primary--text justify-center">
                  {{ selectedSong.title }}
                </v-flex>

                <v-flex xs12 class="font-weight-bold subtitle-1 secondary--text justify-center">
                  <div v-if="selectedSong.artist">By: {{ selectedSong.artist }}</div>
                  <div v-else>By: UNKNOWN</div>    
                </v-flex>
              </v-layout>
            </v-card-title>
          
            <v-divider/>
            
            <v-card-text>
              <v-layout 
                row
                wrap 
                align-center 
                justify-center 
                v-for="lyrics in selectedSong.lyrics" 
                :key="lyrics.songPart"
                mb-3
              >
                <v-flex xs12>
                  <div class="font-weight-bold font-italic">{{ lyrics.songPart }} {{ lyrics.songPartNumber }}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="black--text">{{ lyrics.songPartText }}</div>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="dialog = !dialog" outlined>CLOSE</v-btn>
              <v-btn @click="addSong(selectedSong)" color="primary" class="ml-2">
                <v-icon>done_all</v-icon>
                ADD SONG TO LIST
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import SongTextbox from "@/components/SongTextbox.vue"
import songList from "@/components/SongList.vue"
import { saveAs } from 'file-saver'

export default {
  name: "home",
  mounted() {
    this.$store.dispatch("Get_All_Songs");
  },
  components: {
    SongTextbox,
    songList
  },
  data() {
    return {
      song: "",
      search: "",
      loading: false, 
      dialog: false,
      selectedSong: {},
    }
  },
  computed: {
    songsFromDB() {
      let songs = this.$store.getters.GET_ALL_SONGS; 
      return songs.map((song) => {
        return {
          text: song.title,
          value: song
        };
      }); 
    },
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
    filteredList() {
      if(this.search === null || this.search === "" || this.search === undefined) return null;
      return this.songsFromDB.filter(song => song.title >= this.search.toUpperCase()      
        || song.artist >= this.search);
    },
  },
  methods: {
    addSong(song) {
      this.$store.commit('PUSH_SONG_TO_LIST', song);
      this.song = "";
      this.dialog = false;
    },
    addFields() {
      this.$store.commit('INCREMENT_FIELD_COUNT');
    },
    async generateLyrics() {
      let list = this.$store.getters.GET_SONG_LIST;
      var content = [];

      for(let i = 0; i != list.length; i++) {
        let song = list[i];
        content.push(song.title);
        content.push("\n");

        for(let j = 0; j != song.lyrics.length; j++) {
          let songLyrics = list[i].lyrics[j];
          
          let lyricPartHeader = "";
          if(songLyrics.songPartNumber === undefined || songLyrics.songPartNumber === "") {
            lyricPartHeader = songLyrics.songPart + ") ";
          }
          else {
            lyricPartHeader = songLyrics.songPart + songLyrics.songPartNumber + ") ";
          }
          let lyricPartText = songLyrics.songPartText;

          content.push(lyricPartHeader);
          content.push(lyricPartText);
          content.push("\n");
          content.push("\n");
        }
        content.push("\n");
      }
      var filename = await this.$swal.fire({
        title: "Enter Filename of the Generated Song List",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
          if(!value) {
            return "You need to enter a filename!"
          }
        }
      });
      
      if(filename.value) {
        this.$swal.fire(`${filename.value}.txt will be downloaded...`);
        var type = 'text/plain';
        var file = new Blob(content, {type:type}); 
        saveAs(file, filename.value);
      }
    },
    customFilter (item, queryText, itemText) {
      return queryText.toUpperCase().length > 1 
        && itemText.toUpperCase().indexOf(queryText.toUpperCase()) > -1;
      //return this.item.filter((song) => {return boolean})
    },
    openPreview(song) {
      this.dialog = true;
      this.selectedSong = song;
    }
  },
};
</script>
