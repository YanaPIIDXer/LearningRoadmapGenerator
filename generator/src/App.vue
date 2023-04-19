<script setup lang="ts">
import { onMounted } from 'vue';
import { useLINE } from "./compositions/Line";

const line = useLINE();

onMounted(() => {
  line.loginLIFF();
});

/**
 * メッセージ送信テスト用関数
 */
const test = async () => {
  try {
    await line.sendMessage("Test");
  } catch (error) {
    alert("Error.");
    console.error(error);
  }
}
</script>

<template lang="pug">
.root
  button(@click="test") Test
</template>

<style lang="sass" scoped>
</style>
