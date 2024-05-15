<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Welcome to Vue2.7 !');
</script>
