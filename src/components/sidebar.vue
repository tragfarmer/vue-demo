<template>
  <div class="m-sidebar">
    <div class="m-logo">
      <router-link to="/readme">
        <img
          v-show="isCollapse"
          src="../assets/icon/logo_short.png"
        >
        <img v-show="!isCollapse" src="../assets/icon/logo_long.png">
      </router-link>
    </div>
    <el-menu
      class="el-sidebar-menu"
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      unique-opened
      router
    >
      <template v-for="menu in menus">
        <template>
          <el-submenu v-if="menu.subs" :index="menu.index" :key="menu.index">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span slot="title">{{ menu.title }}</span>
            </template>
            <el-menu-item v-for="(subMenu,i) in menu.subs" :key="i" :index="subMenu.index">
              <span>{{ subMenu.title }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="menu.index" :key="menu.index">
            <div>
              <i :class="menu.icon"></i>
              <span slot="title">{{ menu.title }}</span>
            </div>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import User from '@/common/user.js'
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: function () { return false }
    }
  },
  components: {},
  data () {
    return {
    }
  },
  computed: {
    menus () {
      return User.getMenus()
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
  }
}
</script>

<style>
.el-submenu__title i {
  color: #fff;
  font-weight: 700;
}
.el-sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}
.m-sidebar .el-menu .el-menu--inline {
  box-sizing: border-box;
  border-left: #0b50da solid 4px;
}
</style>

<style scoped rel="stylesheet">
.m-logo {
  height: 45px;
  border-bottom: #0b50da solid 4px;
}
.m-logo img {
  height: 35px;
  padding: 5px;
}
.m-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #2e363f;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
