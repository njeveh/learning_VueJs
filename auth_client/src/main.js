// import Vue from 'vue';
import { createApp } from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.min.css'
import router from './router'
import configureAxios from './services/http';

// Vue.config.productionTip = false;

configureAxios();

const app = createApp(App);
app.use(router);
app.mount('#app');
