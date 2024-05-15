<template>
  <section class="p-layout" :class="classObj">
    <Header></Header>
    <div
      class="p-layout-body"
      :class="{
        'slider-full': sidebar.opened,
        'slider-mini': !sidebar.opened,
      }"
    >
      <aside class="app-wrapper">
        <Sidebar class="sidebar-container" :sidebar="sidebar"></Sidebar>
      </aside>
      <div class="p-layout-panel">
        <div class="p-layout-content">
          <div class="p-layout-container">
            <div class="p-layout-breadcrumb">
              <Breadcrumb
                id="breadcrumb-container"
                class="breadcrumb-container"
                @toggleSlider="toggleSlider"
              ></Breadcrumb>
            </div>
            <app-main></app-main>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { Header, AppMain, Sidebar, Breadcrumb } from './components';
const sidebar = reactive({
  opened: true,
  withoutAnimation: false,
});
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.opened,
    openSidebar: sidebar.opened,
    withoutAnimation: sidebar.withoutAnimation,
  };
});
const toggleSlider = function () {
  // ------------------temp------------------------
  this.sidebar.opened = !this.sidebar.opened;
  this.sidebar.withoutAnimation = false;
  if (this.sidebar.opened) {
    localStorage.setItem('opened', 1);
  } else {
    localStorage.setItem('opened', 0);
  }
  //-------------------temp--------------------------
};
</script>

<style scoped lang="less"></style>
