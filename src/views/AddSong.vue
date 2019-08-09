<template>
	<div class="AddSong">
		<v-layout row wrap align-center justify-center>
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
		</v-layout>

		<v-layout row mt-5 justify-center align-center>
			<v-card
				class="align-center justify-center pa-3"
				width="450px"
				outlined
			>
				<v-layout row wrap align-center justify-center mt-3>
					<v-flex xs12 mb-3>
						<div class="caption secondary--text font-italic">Real-time lyrics preview</div>
						<v-divider/>
					</v-flex> 
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
						<span v-if="artist === ''" class="body-1 secondary--text"> NONE </span> 
						<span class="body-1 secondary--text"> {{ artist }}</span> 
					</v-flex>
				</v-layout>
				
				<v-layout row wrap v-for="lyric in lyrics" :key="lyric.songPartText" pa-4>
					<v-flex xs12 v-if="lyric.songPart !== 'Others'">
						<div class="subheading font-weight-bold font-italic">{{ lyric.songPart }} {{ lyric.songPartNumber }}</div>
					</v-flex>
					<v-flex xs12 v-else>
						<div class="subheading font-weight-bold font-italic">{{ lyric.customSongPart }}</div>
					</v-flex>
					<v-flex xs12>
						<div class="body-1">{{ lyric.songPartText }}</div>
					</v-flex>
				</v-layout>

			</v-card>
		</v-layout>
		
		<v-layout row align-center justify-center>
			<v-dialog
				v-model="uploadDialog"
				persistent
				max-width="650px"
			>
				<v-card>
					<v-card-title>
						<v-layout row wrap justify-start align-center>
							<v-flex xs6>
								<div class="headline primary--text font-weight-bold">ADD SONG VIA TEXT FILE</div>
							</v-flex>
							<v-flex xs2 offset-xs1>
								<v-btn outlined color="secondary" @click="uploadDialog = !uploadDialog">
									CANCEL
								</v-btn>
							</v-flex>
							<v-flex xs3>
								<v-btn color="primary" 
									@click="processFiles2" 
									:loading="uploadLoading" 
									:disabled="files.length <= 0 || uploadLoading"
								>
									UPLOAD FILES
								</v-btn>
							</v-flex>
						</v-layout>
					</v-card-title>

					<v-card-text>
						<v-layout row pa-3>
							<v-flex xs12>
								<vueDropzone 
									ref="dropzone"
									id="dropzone"
									:options="dropzoneOptions"
									duplicateCheck
									@vdropzone-file-added="addFile"
									@vdropzone-removed-file="removeFile"
									@vdropzone-duplicate-file="duplicateError"
									@vdropzone-error="errorInUpload"
								/>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>

<script>
import { DB } from "@/config/firebase";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { debuglog } from 'util';

export default {
	name: "AddSong", 
	components: {
		 vueDropzone: vue2Dropzone,
	},
	data() {
		return {
			title: "",
			artist: "",
			lyrics: [{}],
			songPartList: ["Verse", "Chorus", "Bridge", "Coda", "End", "Others"],
			songPart: "",
			customSongPart: "",
			songPartNumber: "",
			songPartText: "",
			saveLoading: false,
			uploadLoading: false,
			uploadDialog: false,
			
			files: [],
			
			//DropZone Component
			dropzoneOptions: {
				autoProcessQueue: false,
				url: '/',
				acceptedFiles: 'text/plain',
				addRemoveLinks: true,
				thumbnailWidth: 80,
				thumbnailHeight: 80,
				dictDefaultMessage: "Click this box or Drag File in this box to upload files..."
			},
		}
	},
	computed: {
		SongPartHeader() {
			if(this.songPart === "Verse") {
				return this.songPart + " " + this.songPartNumber;
			}
			else if(this.songPart === "Chorus") {
				return this.songPart + " " + this.songPartNumber;
			}
			else if(this.songPart === "Others") {
				return this.customSongPart
			}
			else {
				return this.songPart;
			}
		}
	},
	methods: {
		resetForm() {
			this.$refs.form.reset();
			this.lyrics = [{}];
		},
		addLyricsPart() {
			const lyric = {
				songPart: this.SongPartHeader,
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
		},
		addFile(file) {
			this.files.push(file);
		},
		duplicateError(file) {
			this.$swal.fire("warning", `${file.name} already exist, please try again...`, "warning");
			this.removeFile(file);
		},
		errorInUpload(file){
			if(file.accepted === false) {
				this.$swal.fire("error", `"${file.name}" is an invalid file. Please upload .txt files only.`, "error");
			}
			else this.$swal.fire("warning", "Error was encountered during the upload. Please try again.");
			console.log(file.status);

			this.$refs.dropzone.removeFile(file);
		},

		removeFile(file) {
			let removedFile = file;
			let removedFileIndex = this.files.findIndex((file) => file.name === removedFile.name);
			this.files.splice(removedFileIndex,1);
			console.log(this.files);
		},
		
		async processFiles2() {
			this.uploadLoading = true;
			var txtFilesNotUploaded = 0;

			for(var i = 0; i < this.files.length; i++) {
				this.uploadLoading = true;
				this.$swal.fire(
					{
						type: "warning",
						title: "Warning",
						text: `Processing ${i + 1} of ${this.files.length} files. Please dont close the browser...`, 
					}
				);

				const file = this.files[i];
				const reader = new FileReader();
				
				reader.readAsText(file);
				
				reader.onload = async () => {
					
					let txtContent = reader.result.split("\n");
					const song = await this.extractDetails(txtContent);
					console.log(song);
	
					try {
						await DB.collection("songs")
						.doc()
						.set(song);
						console.log(song.title + " is added!");
					}
					catch(error) {
						this.$swal.fire('Error', `${song.title} was not added due to an error. Please try again.`, 'error');
					}
				}
				this.uploadLoading = false;
			}
			
			const response = await this.$swal.fire(
				{
					type: "success",
					title: "Success",
					text: `${this.files.length} songs were added...`, 
					showCancelButton: false, 
				}
			);
			
			if(response) {
				this.files = [];
				this.$refs.dropzone.removeAllFiles();
				this.uploadDialog = false;
			}
		}, 

		extractDetails(arrayedTextFile) {
			let song;

			let extractedTitle = arrayedTextFile[0];
			console.log(`TITLE: ${extractedTitle}`);

			let extractedArtist = arrayedTextFile[1];
			var startScanLine;

			if(extractedArtist === "\r") {
				extractedArtist = "UNKNOWN";
				startScanLine = 2;
			}
			else {
				extractedArtist = extractedArtist.replace("(", "").replace(")", "");
				startScanLine = 3;
			}
			console.log(`ARTIST: ${extractedArtist}`);

			let extractedLyrics = [];
			let songPart = [];
			let songPartTitle = "";
			
			for(let i = startScanLine; i < arrayedTextFile.length; i++) {
				let line = arrayedTextFile[i];
				
				if(line === "\r") console.log("return tab");
				else console.log(line); 
				
				let newLine;

				if( !isNaN(line.charAt(0)) && line.charAt(1) === ")") {
					//remove the part of verse song indicator e.g: 1), 2), etc)
					songPartTitle = "VERSE " + line.charAt(0);
					newLine = line.replace(`${line.charAt(0)}) `, "");
					songPart.push(newLine + "\n");
				}
				else if(line.includes("V)")) {
					songPartTitle = "VERSE";
					newLine = line.replace("V) ", "");
					songPart.push(newLine + "\n");
				}
				else if(line.includes("TALATA)")) {
					songPartTitle = "TALATA";
					newLine = line.replace("TALATA) ", "");
					songPart.push(newLine + "\n");
				}
				else if(line.includes("C)" || "CHORUS)")) {
					songPartTitle = "CHORUS";
					newLine = line.replace("C) " || "CHORUS) ", "");
					songPart.push(newLine + "\n");
				}
				else if(line.includes("KORO)")) {
					songPartTitle = "KORO";
					newLine = line.replace("KORO) ", "");
					songPart.push(newLine + "\n");
				}
				else if(line.includes("BRIDGE)")) {
					songPartTitle = "BRIDGE";
					newLine = line.replace("BRIDGE) ", "");
					songPart.push(newLine + "\n");
				}
				else if(line.includes("END)")) {
					songPartTitle = "END";
					newLine = line.replace("END) ", "");
					songPart.push(newLine + "\n");
				}
				else if(line.includes("CODA)")) {
					songPartTitle = "CODA";
					newLine = line.replace("CODA) ", "");
					songPart.push(newLine + "\n");
				}
				else if(line === "\r") {
					//close current songPart and add to lyrics
					extractedLyrics.push(
						{
							songPart: songPartTitle,
							songPartNumber: null,
							songPartText: songPart.join(''), 
						}
					);
					songPart = [];
					songPartTitle = "";
				} 
				else {
					newLine = line;
					songPart.push(line + "\n");

					//if EOF already, close the loop
					if(i === arrayedTextFile.length - 1) {
						extractedLyrics.push(
							{
								songPart: songPartTitle,
								songPartNumber: null,
								songPartText: songPart.join(''), 
							}
						);
					}
				}
				
			}

			return song = {
				title: extractedTitle,
				artist: extractedArtist,
				lyrics: extractedLyrics
			};
		}
	},
}
</script>

<style>

</style>
