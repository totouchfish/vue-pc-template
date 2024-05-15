<template>
  <div class="p-layout-topbar clearfix" :style="topBarColor">
    <div class="p-layout-collapse">
      <div class="p-layout-left">
        <h2 class="title">{{ settings.projectName }}</h2>
        <em class="lines"></em>
        <h3 class="name">{{ settings.subTitleName }}</h3>
      </div>
    </div>
    <div class="p-layout-nav el-height-full">
      <el-row :gutter="15" type="flex" align="middle" class="el-height-full">
        <el-col>
          <img src="@/assets/images/head.png" alt="" />
          {{ $route.query.account || 'admin' }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import settings from '@/global.config';
import { ref, computed } from 'vue';
const isCollapse = ref(0);
const theme = ref('');
const topBarColor = computed(() => {
  return { background: '#31364A' };
});
</script>
