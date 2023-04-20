<script setup lang="ts">
import { ref, toRef, type Ref } from "vue";
import Dropdown from "primevue/dropdown";

interface Props {
  answers: string[];
  index: number;
}
const props = defineProps<Props>();

const emits = defineEmits<{
  (el: "selected", value: string, index: number): void
}>();

const answers: Ref<string[]> = toRef(props, "answers");
const index: Ref<number> = toRef(props, "index");
const selectedItem = ref("");

/**
 * 選択された
 */
const onSelected = () => {
  emits("selected", selectedItem.value, index.value);
}

defineExpose({
  answers,
  Dropdown,
  index,
  selectedItem,
  onSelected,
});
</script>

<template lang="pug">
.answerList
  h2 質問 {{ (index + 1) }}
  div 下記から該当するものを選んでください
  Dropdown(v-model="selectedItem" :options="answers" @update:modelValue="onSelected")
</template>

<style lang="sass" scoped>
</style>
