<script setup lang="ts">
import { onMounted } from 'vue';
import { useLINE } from "./compositions/Line";

const line = useLINE();

onMounted(() => {
  line.loginLIFF();
});
</script>

<template lang="pug">
</template>

<style lang="sass" scoped>
</style>
