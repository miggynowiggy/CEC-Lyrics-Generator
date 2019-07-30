import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
//import "material-design-icons-iconfont/dist/material-design-icons.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi" || "md"
  },
  theme: {
    themes: {
      light: {
        primary: colors.red.darken2,
        secondary: colors.grey.darken1,
        accent: colors.red.lighten1,
        error: colors.yellow.accent3
      }
    }
  }
});
