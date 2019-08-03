import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Instructions from "@/views/Instructions.vue";
import AddSong from "@/views/AddSong.vue";
//import AddSong2 from "@/views/AddSong2.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/instructions",
      name: "instructions",
      component: Instructions
    },
    {
      path: "/addSong",
      name: "addSong",
      component: AddSong
    }
  ]
});
