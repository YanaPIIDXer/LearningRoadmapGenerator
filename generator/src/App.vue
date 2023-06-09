<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue';
import { useLINE } from "./compositions/Line";
import answers from "@/assets/answers.json";
import AnswerList from "@/components/AnswerList.vue";
import PrimeButton from "primevue/button";
import axios from "axios";

const line = useLINE();
const params = new URLSearchParams(location.search);
const field = ref(params.get("field") ?? "Invalid");
const userId = params.get("userId") ?? "Invalid";

const answerItems: Ref<string[][]> = ref(answers.items);
type AnswerResult = string | null;
const answerList: Ref<AnswerResult[]> = ref(new Array(answerItems.value.length).fill(null));
const isProgress = ref(false);

/**
 * 解答が選択された
 */
const onSelectedAnswer = (value: string, index: number) => {
  answerList.value[index] = value;
}

/**
 * 送信
 */
const send = async () => {
  const body = {
    field: field.value,
    choices: answerList.value,
    userId: userId,
  } 

  try {
    isProgress.value = true;
    const conn = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      //withCredentials: true,
    });
    await conn.post("/request", body);
  } catch (error) {
    alert("Error");
    console.error(error);
  } finally {
    isProgress.value = false;
  }

  if (!import.meta.env.DEV) {
    line.closeLIFF();
  }
}

onMounted(() => {
  if (!import.meta.env.DEV) {
    line.loginLIFF();
  }
});

defineExpose({
  field,
  answerItems,
  AnswerList,
  onSelectedAnswer,
  PrimeButton,
  send,
})
</script>

<template lang="pug">
.root
  h1 学びたい分野： {{ field }}
  .answers(v-for="(items, index) in answerItems")
    AnswerList(:answers="items" :index="index" @selected="onSelectedAnswer")
  .footer
    PrimeButton(label="送信" @click="send" :disabled="isProgress || !answerList.every(a => a !== null)")
</template>

<style lang="sass" scoped>
</style>
