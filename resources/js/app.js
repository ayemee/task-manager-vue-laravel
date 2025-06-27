import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.vue'
import router from './router'
import axios from 'axios';
// import ExampleComponent from './components/ExampleComponent.vue';

const app = createApp(App)

app.use(createPinia());

// 🔹 Set axios as a global property
app.config.globalProperties.$axios = axios;

// Or use axios defaults
axios.defaults.baseURL = '/api'; // optional
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// app.component('example-component', ExampleComponent);
app.use(router)
app.mount('#app');
