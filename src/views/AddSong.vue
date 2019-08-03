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

							<v-layout row wrap align-center justify-center v-for="lyric in lyrics" :key="lyric" mt-5 pa-2>
								<v-flex xs8>
									<v-select
										v-model="lyric.songPart"
										label="Song Part?"
										placeholder="Click to select song part..."
										:items="songPartList"
										outlined
									>
									</v-select>
								</v-flex>
								<v-flex xs3 offset-xs1 v-show="lyric.songPart >= 'Verse' | lyric.songPart >= 'Chorus'">
									<v-text-field
										v-model="lyric.songPartNumber"
										outlined
										:label= "lyric.songPart + ' Number?'"
										:hint="'If song only contains one ' + lyric.songPart + ', leave this blank'"
									>
									</v-text-field>
								</v-flex>
								
								<v-flex xs12>
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

					<v-card-actions right>
						<v-spacer/>
						<v-btn @click="addLyricsPart">ADD SONG PART</v-btn>
						<v-btn @click="resetForm">RESET FORM</v-btn>
						<v-btn type="submit">ADD SONG</v-btn>
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
						<span class="body-1 secondary--text"> {{ artist }}</span> 
					</v-flex>
				</v-layout>
				
				<v-layout row wrap v-for="lyric in lyrics" :key="lyric.songPartText" pa-4>
					<v-flex xs12>
						<div class="subheading font-weight-bold font-italic">{{ lyric.songPart }} {{ lyric.songPartNumber }}</div>
					</v-flex>
					<v-flex xs12>
						<div class="body-1">{{ lyric.songPartText }}</div>
					</v-flex>
				</v-layout>

			</v-card>
		</v-layout>
	</div>
</template>

<script>
export default {
	name: "AddSong", 
	data() {
		return {
			title: "",
			artist: "",
			lyrics: [{}],
			songPartList: [ "Verse", "Chorus", "Bridge", "Coda" ],
			songPart: "",
			songPartNumber: "",
			songPartText: "",
			verseCounter: 0,
			chorusCounter: 0,
		}
	},
	computed: {

	},
	methods: {
		resetForm() {
			this.$refs.form.reset();
			this.lyrics = [{}];
		},
		checkPartAdded() {
			if(this.songPart === "Verse") this.songPart = `${this.songPart} ${this.songPartNumber}`;
			else if(this.songPart === "Chorus") this.songPart = `${this.songPart} ${this.songPartNumber}`;
		},
		addLyricsPart() {
			const lyrics = {
				songPart: `${this.songPart} ${this.songPartNumber}`,
				songPartNumber: this.songPartNumber,
				songPartText: this.songPartText 
			};
			this.lyrics.push(lyrics);
			console.log(this.lyrics);
		},
		submitSong() {
			const song = {
				title: this.title,
				artist: this.artist,
				lyrics: this.lyrics
			};
			this.$swal.fire('success', `${song.title} has been added successfully!`, 'success');
			console.log(song);
			this.resetForm();
		}
	},
}
</script>

<style>

</style>
