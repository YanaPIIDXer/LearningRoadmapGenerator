<script lang="ts" setup>
import type { RoadmapResponse } from "@/interfaces/Roadmap";

interface Props {
  item: RoadmapResponse;
}
const props = defineProps<Props>();

</script>

<template lang="pug">
.roadmapImage
  span 分野： {{ props.item.field }}
</template>

<style lang="sass" scoped>
</style>
