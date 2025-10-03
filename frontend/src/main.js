import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "./assets/fonts/fonts.css";
import router from "./router";
import i18n from "./i18n";
import { http } from "./services/http";
// Vue Toast Notification
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css"; // theme
import { createPinia } from "pinia";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flag-icons/css/flag-icons.min.css";

const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(VueToast, {
  position: "top-right",
  duration: 3000,
  dismissible: true,
});
app.config.globalProperties.$http = http;

app.mount("#app");
