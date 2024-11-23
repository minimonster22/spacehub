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
<script>
import ApodCard from "@/components/ApodCard.vue";
import AsteroidsCard from "@/components/AsteroidsCard.vue";
import NotificationsCard from "@/components/NotificationsCard.vue";
import EpicCard from "@/components/EpicCard.vue";
import ExperimentsCard from "@/components/ExperimentsCard.vue";
import TechTransferCard from "@/components/TechTransferCard.vue";

export default {
  name: "NavigationBox",
  components: {TechTransferCard, ExperimentsCard, EpicCard, NotificationsCard, AsteroidsCard, ApodCard}
}
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