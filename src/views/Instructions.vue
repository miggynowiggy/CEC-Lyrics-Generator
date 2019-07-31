<template>
  <div class="instructions">
    <v-layout row align-center justify-center>
      <div class="headline primary--text font-weight-black">HOW TO USE?</div>
    </v-layout>

    <v-layout row wrap align-center justify-center mt-3>
      <v-flex xs6>
        <div class="body-1">
          On the textbox, enter either the Title, or the Artist/Composer 
          of the song you want to get the lyrics. As you type, song suggestions will be shown. 
          Just click on any of the choices available on the list, and a pop-up dialog will show 
          the lyrics of the selected song. To finally add the song to the list, just click the
          <span class="font-weight-bold">Add Song</span> button. 
          Once you have added all the necessary songs,
          click the <span class="font-weight-bold">"Generate Lyrics List"</span> Button. 
          Wait for the system to generate the file, and once done. The file will be automatically 
          downloaded to your computer.
        </div>
      </v-flex>
    </v-layout>

    <v-layout row wrap align-center justify-center mt-5>
      <div class="primary--text headline font-weight-black">CREATED BY:</div>
    </v-layout>

    <v-layout row wrap align-center justify-center>
      <div>JUAN MIGUEL MENDOZA - Saint Augustine CEC</div>
    </v-layout>
  </div>
</template>
