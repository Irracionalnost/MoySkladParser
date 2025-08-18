import { createApp } from 'vue';
import App from './resources/js/views/App.vue';
import { createWebHistory, createRouter } from 'vue-router';
import Home from './resources/js/pages/Home.vue';

import '@/resources/bootstrap/css/bootstrap.min.css';
import '@/resources/styles/style.scss';
import '@/resources/bootstrap/js/bootstrap.bundle.min.js';

const routes = [{ path: '/home', component: Home }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
