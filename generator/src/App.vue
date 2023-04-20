<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue';
import { useLINE } from "./compositions/Line";
import answers from "@/assets/answers.json";
import AnswerList from "@/components/AnswerList.vue";
import PrimeButton from "primevue/button";

const line = useLINE();
const params = new URLSearchParams(location.search);
const field = ref(params.get("field") ?? "Invalid");

const answerItems: Ref<string[][]> = ref(answers.items);
type AnswerResult = string | null;
const answerList: Ref<AnswerResult[]> = ref(new Array(answerItems.value.length).fill(null));

/**
 * 解答が選択された
 */
const onSelectedAnswer = (value: string, index: number) => {
  answerList.value[index] = value;
}

onMounted(() => {
  //line.loginLIFF();
});

defineExpose({
  field,
  answerItems,
  AnswerList,
  onSelectedAnswer,
})
</script>

<template lang="pug">
.root
  h1 学びたい分野： {{ field }}
  .answers(v-for="(items, index) in answerItems")
    AnswerList(:answers="items" :index="index" @selected="onSelectedAnswer")
  .footer
    PrimeButton(label="送信" :disabled="!answerList.every(a => a !== null)")
</template>

<style lang="sass" scoped>
</style>
