import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from "vue-sweetalert2";

Vue.config.productionTip = false;
Vue.use(vuetify);
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  vuetify,
  VueSweetalert2,
  render: h => h(App)
}).$mount("#app");
