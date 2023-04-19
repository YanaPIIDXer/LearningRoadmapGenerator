<script setup lang="ts">
import { onMounted } from 'vue';
import liff from "@line/liff";

onMounted(() => {
  liff.init({
    liffId: import.meta.env.VITE_APP_LINE_LIFF_ID,
    withLoginOnExternalBrowser: true,
  }, () => {
    console.log("Init LIFF Success!");
  }, () => {
    console.error("Init LIFF Error...");
  });
});
</script>

<template lang="pug">
</template>

<style lang="sass" scoped>
</style>
