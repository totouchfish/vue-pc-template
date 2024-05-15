<template>
  <el-row type="flex" justify="space-between" align="middle">
    <div class="p-layout-collapse-icon" @click="toggleslider">
      <i class="el-icon-s-fold"></i>
    </div>

    <el-col>
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="(item, index) in levelList"
            :key="item.path"
          >
            <span
              v-if="
                item.redirect === 'noRedirect' || index == levelList.length - 1
              "
              class="no-redirect"
              >{{ item.meta.title }}</span
            >
            <a v-else @click.prevent="handleLink(item)">{{
              item.meta.title
            }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>

<script>
import pathToRegexp from 'path-to-regexp';
export default {
  data() {
    return {
      levelList: null,
    };
  },
  // components: {
  //   theme,
  // },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    toggleslider() {
      this.$emit('toggleslider');

      // this.$store.dispatch('app/toggleSideBar');
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      // const first = matched[0];

      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched);
      // }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase();
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
    themeChange(val) {
      this.$store.dispatch('setting/changeSetting', {
        key: 'theme',
        value: val,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  // display: inline-block;
  //   font-size: 14px;
  // line-height: 30px;
  padding: 20px 0;
  //   margin-left: 8px;
  width: 100%;
  padding-left: 20px;
  text-align: left;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.p-layout-collapse-icon {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #000;
  height: 100%;
  font-size: 30px;
  position: relative;
  top: 1px;
  left: 2px;
}
</style>
