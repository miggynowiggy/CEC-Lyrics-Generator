<template>
    <div>
        <v-card 
            class="align-center justify-center pa-3"
            width="450px"
            outlined		
        >
            <v-card-title class="headline primary--text font-weight-bold justify-center">
                ADD SONG
            </v-card-title>
            <v-layout row align-center justify-center mt-2>
                <v-flex xs6>
                    <v-btn color="primary" class="caption" @click="uploadDialog = !uploadDialog">
                        ADD SONG VIA TEXT FILE
                        <v-icon></v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-form ref="form" @submit.prevent="submitSong">
                <v-card-text>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                v-model="title"
                                label="Song Title"
                                placeholder="Enter complete title of the song..."
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                v-model="artist"
                                label="Song Artist"
                                placeholder="Enter Song Artist..."
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                        
                    <v-divider/>

                    <v-layout row wrap align-center justify-center v-for="lyric in lyrics" :key="lyric" mt-5 pa-2>
                        <v-flex xs12>
                            <v-select
                                v-model="lyric.songPart"
                                label="Song Part?"
                                placeholder="Click to select song part..."
                                :items="songPartList"
                                outlined
                            >
                            </v-select>
                        </v-flex>
                        <v-flex xs12 mt-2 v-if="lyric.songPart === 'Verse' || lyric.songPart === 'Chorus'">
                            <v-text-field
                                v-model="lyric.songPartNumber"
                                outlined
                                :label= "lyric.songPart + ' Number?'"
                                :hint="'If song only contains one ' + lyric.songPart + ', leave this blank'"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 mt-2 v-else-if="lyric.songPart === 'Others'">
                            <v-text-field
                                v-model="lyric.customSongPart"
                                outlined
                                label= "Custom Song Part"
                                hint="E.g: 'To Chorus' or 'To Coda or Verse'"
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
                            <v-btn @click="resetForm" class="caption">RESET FORM</v-btn>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn @click="addLyricsPart" color="secondary" class="caption">ADD SONG PART</v-btn>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn type="submit" :loading="saveLoading" color="primary">ADD SONG</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "AddEditSong",
    
}
</script>

<style>

</style>
