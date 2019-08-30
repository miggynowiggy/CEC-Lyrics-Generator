<template>
    <div class="admin">
        <v-layout row align-center justify-center>
            <v-card
                flat
                width="600px"
                elevation="1"
                class="pa-5"
            >
                <v-layout row wrap align-center justify-start>
                    <v-flex xs12 md12 mt-3>
                        <div class="primary--text title font-weight-bold">
                            REGISTERED SONGS
                        </div>
                    </v-flex>
                    <v-flex xs12 md12 my-3>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            hide-details
                            outlined
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                
                <v-layout row wrap align-center justify-center>
                    <v-data-table
                        :headers="headers"
                        :items="songsFromDB"
                        :items-per-page="10"
                        :search="search"
                        sort-by="title"
                        :loading="!songsFromDB.length" 
                        loading-text="Loading... Please wait"
                        @click:row="openPreview"
                    ></v-data-table>
                </v-layout>
            </v-card>
        </v-layout>

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

                        <v-card-actions class="justify-center align-center">
                            <v-btn @click="dialog = !dialog" outlined>CLOSE</v-btn>
                            <v-btn @click="deleteSong(selectedSong)" color="primary" class="ml-2">
                                <v-icon>delete</v-icon>
                                Delete Song
                            </v-btn>
                            <v-btn @click="openEditDialog(selectedSong)" color="primary" class="ml-2">
                                <v-icon>edit</v-icon>
                                Edit Song
                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-layout>
        </v-container>

        <v-container>
            <v-dialog
                v-model="editDialog"
                persistent
                width="500px"
            >
                <v-card 
                    class="align-center justify-center pa-3"
                    width="500px"
                    outlined		
                >
                    <v-card-title class="headline primary--text font-weight-bold justify-center">
                        EDIT SONG
                    </v-card-title>
                    
                    <v-form ref="form" @submit.prevent="editSong">
                        <v-card-text>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        v-model="selectedSong.title"
                                        label="Song Title"
                                        placeholder="Enter complete title of the song..."
                                        required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        v-model="selectedSong.artist"
                                        label="Song Artist"
                                        placeholder="Enter Song Artist..."
                                        required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                                
                            <v-divider/>

                            <v-layout row wrap align-center justify-center v-for="(lyric, index) in selectedSong.lyrics" :key="index" mt-5 pa-2>
                                <v-flex xs12>
                                    <v-text-field
                                        v-model="lyric.songPart"
                                        label="Song Part?"
                                        placeholder="Enter song part..."
                                        hint="('Verse 1', 'Chorus', 'Bridge')"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-flex>
                                                            
                                <v-flex xs12 mt-2>
                                    <v-textarea
                                        v-model="lyric.songPartText"
                                        outlined
                                        label="Lyrics Part"
                                        placeholder="Enter lyrics of the song part..."
                                        required
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-card-text>

                        <v-card-actions>
                            <v-layout row wrap align-center justify-center>
                                <v-flex xs4>
                                    <v-btn @click="editDialog = !editDialog">CANCEL</v-btn>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn @click="addLyricsPart" color="secondary" class="caption">ADD SONG PART</v-btn>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn 
                                        type="submit" 
                                        :loading="saveLoading" 
                                        color="primary"
                                        class="caption"
                                    >APPROVE CHANGES</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import { DB } from "@/config/firebase";

export default {
    name: "Admin",
    data() {
        return {
            search: "",
            selectedSong: {},
            dialog: false,
            editDialog: false,
            saveLoading: false,
            title: "",
            artist: "",
            lryics: [],
            headers: [
                {
                    text: 'Title',
                    align: 'left',
                    sortable: true,
                    value: 'title',
                },
                { text: 'Artist', value: 'artist' },
            ],
            songPartList: ["VERSE", "CHORUS", "BRIDGE", "CODA", "END", "OTHERS"],
        }
    },
    computed: {
        songsFromDB() {
            let songs = this.$store.getters.GET_ALL_SONGS; 
            return songs; 
        }
    },
    methods: {
        addLyricsPart() {
			this.selectedSong.lyrics.push(
				{
					songPart: this.songPart + " " + this.songPartNumber,
					songPartText: this.songPartText,
				}
			);
		},
        openPreview(song) {
            this.dialog = true;
            this.selectedSong = song;
        },
        openEditDialog(song) {
            this.dialog = false;
            this.editDialog = true;
            this.selectedSong = song;
        },

        async editSong() {
            this.saveLoading = true;
            //await this.$store.dispatch("Edit_Song_Details", this.selectedSong);
            
            console.log(this.selectedSong);
            await DB.collection("songs")
            .doc(this.selectedSong.id)
            .update(this.selectedSong)
            .then(() => {
                console.log(this.selectedSong.title + "has been updated!");
                this.$swal.fire("success", `${this.selectedSong.title} has been updated successfully!`, "success");
                this.editDialog = false;
            })
            .catch((error) => {
                console.log(error);
                this.$swal.fire("error", `${this.selectedSong.title} was not updated!`, "error");
                this.editDialog = false;
            });
            this.saveLoading = false;
        },

        async deleteSong(song) {
            await this.$swal.fire({
                title: 'Confirm Deletion',
                text: "Do you really want to delete " + song.title,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        this.dialog = false;
                        console.log(song);
                        await DB.collection("songs")
                        .doc(song.id)
                        .delete()
                        .then(() => {
                            this.$swal.fire('Deleted!', song.title + ' has been deleted.', 'success');
                        });
                    } catch (error) {
                        this.$swal.fire("error", error.message, "error");
                    }  
                }
            });
        }
    }
}
</script>

<style>

</style>
