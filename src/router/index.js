import { createRouter, createWebHistory } from 'vue-router';

import MainPage from "@/components/MainPage.vue";
import ApodCard from "@/components/card/ApodCard.vue";
import AsteroidsCard from "@/components/card/AsteroidsCard.vue";
import EpicCard from "@/components/card/EpicCard.vue";
import ExperimentsCard from "@/components/card/ExperimentsCard.vue";
import NotificationsCard from "@/components/card/NotificationsCard.vue";
import TechTransferCard from "@/components/card/TechTransferCard.vue";
import FavoritesApod from "@/components/card/FavoritesApod.vue";

const routes = [
    { path: '/', name: 'MainPage', component: MainPage },
    { path: '/apod', name: 'ApodCard', component: ApodCard },
    { path: '/asteroids', name: 'AsteroidsCard', component: AsteroidsCard },
    { path: '/epic', name: 'EpicCard', component: EpicCard },
    { path: '/experiments', name: 'ExperimentsCard', component: ExperimentsCard },
    { path: '/notifications', name: 'NotificationsCard', component: NotificationsCard },
    { path: '/tech-transfer', name: 'TechTransferCard', component: TechTransferCard },
    { path: '/apod/favorites', name: 'FavoritesApod', component: FavoritesApod },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;