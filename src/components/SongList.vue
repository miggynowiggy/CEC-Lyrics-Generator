<template>
    <div class="songList">
        <v-layout row align-baseline justify-center wrap mt-3 mb-3 pa-3 class="secondary lighten-4">
            <v-flex xs2>
                <div class="secondary--text subheading">Song #{{ songNumber + 1 }}</div>
            </v-flex>
            <v-flex xs6>
                <div class="primary--text">{{ songTitle }}</div>
            </v-flex>
            <v-flex xs1>
                <v-btn outlined color="primary" @click="removeSong(songTitle)">
                    <v-icon medium>close</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: "SongList",
    props: ["songTitle", "songNumber"],

    computed: {
        
    },
    methods: {
        removeSong(song) {
            this.$store.commit('REMOVE_SONG_FROM_LIST', song);
        }
    }
}
</script>

<style>

</style>
