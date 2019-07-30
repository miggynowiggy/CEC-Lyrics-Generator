<template>
    <v-layout row align-baseline justify-center mt-4>
        <v-flex xs5>
            <v-text-field
                v-model="song"
                label="Song #1"
                placeholder="Enter the title or artist of the desired song."
                outlined
                rounded
                color="primary"
            ></v-text-field>
        </v-flex>
        <v-flex xs1 align-content-center>
            <v-btn outlined color="primary">
                <v-icon medium>close</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs1 align-content-center>
            <v-btn flat color="primary">
                <v-icon medium>done_outline</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: "SongTextbox",
    data() {
        return {
            song: "",
        }
    },
}
</script>

<style>

</style>
