import { createApp } from 'vue';
import App from './resources/js/views/App.vue';
import { createWebHistory, createRouter } from 'vue-router';
import Home from './resources/js/pages/Home.vue';
import DeleteDomens from './resources/js/pages/DeleteDomens.vue';
import Documentation from './resources/js/pages/Documentation.vue';

import '@/resources/bootstrap/css/bootstrap.min.css';
import '@/resources/styles/style.scss';
import '@/resources/bootstrap/js/bootstrap.bundle.min.js';

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/delete-domens', component: DeleteDomens },
  { path: '/documentation', component: Documentation },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
