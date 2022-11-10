import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import messages from "./translate";

const app = createApp(App);

app.use(router);

const i18n = createI18n({
  locale: localStorage.getItem("locale") || "en",
  messages
});
app.use(i18n);

app.mount("#app");
