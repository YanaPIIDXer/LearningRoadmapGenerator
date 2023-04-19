<script lang="ts" setup>
import type { RoadmapResponse } from "../interfaces/Roadmap";
import { toRef, type Ref } from "vue";

interface Props {
  item: RoadmapResponse;
}
const props = defineProps<Props>();

const item: Ref<RoadmapResponse> = toRef(props, "item");

defineExpose({
  item,
});
</script>

<template lang="pug">
.roadmapImage
  span 分野： {{ item.field }}
</template>

<style lang="sass" scoped>
</style>
