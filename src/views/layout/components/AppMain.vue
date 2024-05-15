<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped lang="less">
.app-main {
  width: 100%;
  padding-top: 15px;
  height: calc(100% - 58px);
}
</style>
