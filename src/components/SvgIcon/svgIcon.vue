<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :width="svgWidth"
    :height="svgHeight"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: 20,
  },
});
const iconName = computed(() => {
  return `#icon-${iconClass}`;
});
const svgClass = computed(() => {
  return className ? `svg-icon${className}` : `svg-icon`;
});
const svgWidth = computed(() => {
  return size < 0 || isNaN(size) ? 20 : size;
});
const svgHeight = computed(() => {
  return size < 0 || isNaN(size) ? 20 : size;
});
</script>

<style scoped lang="scss">
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor; // svg颜色
  overflow: hidden;
}
</style>
