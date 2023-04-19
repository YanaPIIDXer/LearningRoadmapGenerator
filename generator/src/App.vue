<script setup lang="ts">
import sample from "@/assets/sample.json";
console.log(sample);
</script>

<template lang="pug">
.root
  span {{ sample.field }}
</template>

<style lang="sass" scoped>
</style>
