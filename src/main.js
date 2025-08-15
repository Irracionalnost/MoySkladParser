import { createApp } from 'vue';
import App from './resources/js/views/App.vue';
import './resources/scss/app.scss';
import { createWebHistory, createRouter } from 'vue-router';

import Home from './resources/js/pages/Home.vue';

const routes = [{ path: '/home', component: Home }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
