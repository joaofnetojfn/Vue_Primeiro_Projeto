import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import "chart.js";
import "hchs-vue-charts";
import VueChart from 'vue-chart-js';

Vue.use(VueChart);
Vue.use(window.VueCharts);

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
Vue.config.productionTip = false;

/* eslint-disable no-new
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});*/

new Vue({
  render:h=> h(App)
}).$mount("#app")

