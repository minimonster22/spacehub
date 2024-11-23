import {create, NCard } from 'naive-ui';

import {createApp} from 'vue'
import App from './App.vue'

const naive = create({
    components: [NCard]
});

const app = createApp(App);

app.use(naive);

app.mount('#app');