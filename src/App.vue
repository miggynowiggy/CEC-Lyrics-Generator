<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <v-layout row align-center justify-center mt-3 mb-5>
          <v-flex xs12>
            <h1 class="primary--text font-weight-bold">CEC LYRICS GENERATOR</h1>
          </v-flex>
        </v-layout>

        <router-link to="/">Home</router-link> |
        <router-link to="/instructions">Instructions</router-link> | 
        <router-link to="/addSong">Add Song to Database</router-link> |
        <router-link to="/admin">Admin Previlages</router-link>

      </div>
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      
    }
  },
  created() {
    this.$store.dispatch("Get_All_Songs");
    console.log(this.$store.getters.GET_ALL_SONGS);
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
