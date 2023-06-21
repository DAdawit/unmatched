import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import VueMeta from "vue-meta";
import moment from "moment";
import AudioRecorder from "vue-audio-recorder";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(AudioRecorder);

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});
export const Bus = new Vue();
Vue.config.productionTip = false;

// production base url
axios.defaults.baseURL = "https://api.yefikrmead.com";

// dev base url
// axios.defaults.baseURL = "https://devapi.yefikrmead.com/";

console.log(process.env.BASE_URL);
console.log(process.env.NODE_ENV);
console.log("Called");

axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem(
  "token"
)}`;
Vue.use(axios);

Vue.filter("snippet", function(value) {
  return value.slice(0, 100) + " ...";
});

Vue.prototype.moment = moment;

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
