<template>
    <v-layout row align-baseline justify-center mt-4>
        <v-flex xs5>
            <v-text-field
                v-model="song"
                :label="textboxLabel"
                placeholder="Enter the title or artist of the desired song."
                outlined
                rounded
                color="primary"
            ></v-text-field>
        </v-flex>
        <v-flex xs1 align-content-center>
            <v-btn outlined color="primary" @click="removeSong(song)">
                <v-icon medium>close</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs1 align-content-center>
            <v-btn color="primary" @click="addSong(song)">
                <v-icon medium>done_outline</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: "SongTextbox",
    props: ["songNumber", "song"],
    data() {
        return {
            song: "",
        }
    },

    computed: {
        textboxLabel() {
            return "Song #" + this.songNumber;
        }
    },

    methods: {
        addSong(song) {
            this.$store.commit('PUSH_SONG_TO_LIST', song);
        },
        addFields() {
            this.$store.commit('INCREMENT_FIELD_COUNT');
        },
        removeSong(song) {
            this.$store.commit('REMOVE_SONG_FROM_LIST', song);
        }
    },
}
</script>

<style>

</style>
