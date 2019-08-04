<template>
    <div class="songList">
        <v-layout row wrap align-center justify-center mt-3 mb-3 pa-3 class="primary">
            <v-flex xs12 md3 justify-content-start>
                <div class="white--text subheading font-italic">Song #{{ songNumber + 1 }}</div>
            </v-flex>
            <v-flex xs12 md5
                :class="{'mt-2': $vuetify.breakpoint.smAndDown, 'mt-0': $vuetify.breakpoint.mdAndUp}"
            >
                <div class="white--text subheading font-weight-bold">{{ songTitle }}</div>
            </v-flex>
            <v-flex xs12 md3 offset-md1
                :class="{'mt-2': $vuetify.breakpoint.smAndDown, 'mt-0': $vuetify.breakpoint.mdAndUp}"
            >
                <v-btn outlined color="white" @click="removeSong(songTitle)">
                    <v-icon medium>close</v-icon>
                    Remove
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
