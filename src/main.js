import {create, NCard } from 'naive-ui';

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";

const naive = create({
    components: [NCard]
});

const app = createApp(App);

app.use(naive);
app.use(router);

app.mount('#app');