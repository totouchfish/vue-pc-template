<template>
  <div class="index">
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
      <slot></slot>
      <span class="tips"> {{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>
<script setup>
import { ValidationProvider } from 'vee-validate';
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  rules: {
    type: String,
    default: 'required',
  },
});
</script>
<style lang="less" scoped>
.tips {
  color: red;
  vertical-align: top;
  display: inline-block;
}
</style>
