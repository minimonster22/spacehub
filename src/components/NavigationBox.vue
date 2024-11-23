<template>
  <div class="container">
    <ApodCard class="card-item"/>
    <AsteroidsCard class="card-item"/>
    <NotificationsCard class="card-item"/>
    <EpicCard class="card-item"/>
    <ExperimentsCard class="card-item"/>
    <TechTransferCard class="card-item"/>
  </div>
</template>
<script setup>

import AsteroidsCard from "@/components/card/AsteroidsCard.vue";
import NotificationsCard from "@/components/card/NotificationsCard.vue";
import EpicCard from "@/components/card/EpicCard.vue";
import ExperimentsCard from "@/components/card/ExperimentsCard.vue";
import TechTransferCard from "@/components/card/TechTransferCard.vue";
import ApodCard from "@/components/card/ApodCard.vue";


</script>


<style scoped>

.container {
  margin: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-around;
}
.card-item {
  width: 12vw;
  cursor: pointer;
}

.card-item:hover {
  border: 1px solid blueviolet;
}
</style>