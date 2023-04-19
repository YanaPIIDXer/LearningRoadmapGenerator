<script setup lang="ts">
import RoadmapImage from "./components/RoadmapImage.vue";
import sample from "./assets/sample.json";

defineExpose({
  RoadmapImage,
  sample,
});
</script>

<template lang="pug">
.root
  RoadmapImage(:item="sample")
</template>

<style lang="sass" scoped>
</style>
