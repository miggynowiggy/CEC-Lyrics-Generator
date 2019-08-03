<template>
	<div class="AddSong">
		<v-layout row wrap align-center justify-center>
			<v-card 
				class="align-center justify-center"
				width="1000px"
				outlined		
			>
				<v-card-title class="headline primary--text font-weight-bold justify-center">
					ADD SONG
				</v-card-title>

				<v-form ref="form" @submit.prevent="submitSong">
					<v-card-text>
						<v-text-field
							v-model="title"
							label="Song Title"
							placeholder="Enter complete title of the song..."
							required
						></v-text-field>
						<v-text-field
							v-model="artist"
							label="Song Artist"
							placeholder="Enter Song Artist..."
							required
						></v-text-field>

						<v-divider/>

						<v-textarea
							v-model="lyrics"
							outlined
							label="Lyrics Part"
							placeholder="Enter lyrics..."
							required
						></v-textarea>					
					</v-card-text>

					<v-card-actions right>
						<v-spacer/>
						<v-btn @click="resetForm">RESET FORM</v-btn>
						<v-btn type="submit" :loading="saveLoading" color="primary">ADD SONG</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-layout>

		<v-layout row mt-5 justify-center align-center>
			<v-card
				class="align-center justify-center pa-3"
				width="500px"
				outlined
			>
				<v-layout row wrap align-center justify-center mt-3>
					<v-flex xs12>
						<div class="headline primary--text font-weight-bold">SONG TITLE: </div>
					</v-flex> 
					<v-flex xs12>
						<span class="body-1 secondary--text"> {{ title }}</span> 
					</v-flex>
				</v-layout>

				<v-layout row wrap align-center justify-center mt-3>
					<v-flex xs12>
						<div class="headline primary--text font-weight-bold">SONG ARTIST: </div>
					</v-flex> 
					<v-flex xs12>
						<span v-if="!artist" class="body-1 secondary--text"> NONE</span> 
						<span class="body-1 secondary--text"> {{ artist }}</span> 
					</v-flex>
				</v-layout>
				
				<v-layout row wrap pa-4>
					<v-flex xs12>
						<div class="subheading">{{ lyrics }}</div>
					</v-flex>
				</v-layout>

			</v-card>
		</v-layout>
	</div>
</template>

<script>
import { DB } from "@/config/firebase";
export default {
	name: "AddSong", 
	data() {
		return {
			title: "",
			artist: "",
			lyrics: "",
			songPartList: [ "Verse", "Chorus", "Bridge", "Coda" ],
			songPart: "",
			songPartNumber: "",
			songPartText: "",
			saveLoading: false,
		}
	},
	computed: {

	},
	methods: {
		resetForm() {
			this.$refs.form.reset();
			this.lyrics = "";
		},
		addLyricsPart() {
			let songPartHeader = `${this.songPart} ${this.songPartNumber}`;
			const lyric = {
				songPart: songPartHeader,
				songPartNumber: this.songPartNumber,
				songPartText: this.songPartText 
			};
			this.lyrics.push(lyric);
		},
		async submitSong() {
			this.saveLoading = true;
			let song = {
				title: this.title,
				artist: this.artist,
				lyrics: this.lyrics
			};
			if(this.artist === "" || this.artist === null || this.artist === undefined) {
				song.artist = null;
			}

			try {
				await DB.collection("songs")
				.doc()
				.set(song);
				this.$swal.fire('success', `${song.title} has been added successfully!`, 'success');
			}
			catch(error) {
				this.$swal.fire('Error', `${error.message}`, 'error');	
				this.saveLoading = false;
			}

			this.resetForm();
			this.saveLoading = false;
		}
	},
}
</script>

<style>

</style>
