<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#393D49"
        text-color="#fff"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        :active-text-color="theme"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue';
import style from '@/assets/styles/element-variables.less';
// -----------------------------------------------------------
import { asyncRoutes, constantRoutes } from '@/router';
// ---------------------------------------------------------

export default {
  props: ['sidebar'],
  data() {
    return {
      theme: style.theme,
      permissionRoutes: [...constantRoutes, ...asyncRoutes],
    };
  },
  components: { SidebarItem },
  computed: {
    // ...mapGetters(['permissionRoutes', 'sidebar', 'theme']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    showLogo() {
      // return this.$store.state.settings.sidebarLogo;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    style() {
      return style;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
