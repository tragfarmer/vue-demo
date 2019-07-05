<template>
  <div :class="isCollapse ? 'm-header m-collapse m-width' : 'm-header m-width'">
    <div class="m-left">
      <img
        :class="isCollapse ? 'm-collapse_icon m-collapse' : 'm-collapse_icon'"
        height="26"
        @click="isCollapse = !isCollapse"
        src="../assets/icon/collapse.png"
      >
      <!-- <el-breadcrumb separator="/" class="m-breadcrumb">
        <el-breadcrumb-item v-for="(v, i) in routeList" v-show="v.name != 'login'" :to="v" :key="i">{{ v.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <div class="m-right">
      <span class="m-tools">
        <img
          @click="clickChangeScreen"
          :src="isFullScreen ? fullScreenExit : fullScreen"
          height="20"
        >
      </span>
      <div class="m-user">
        <img class="m-user-logo" src="@/assets/icon/user.jpg" height="40">
        <el-dropdown trigger="click" @command="clickCommand">
          <span class="el-dropdown-link">
            &nbsp;{{ username }}&nbsp;
            <i class="caret"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/common/user.js'
export default {
  props: {
    value: Boolean
  },
  computed: {
    isCollapse: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    username () {
      let u = user.getUser().username
      if (!u) u = 'Not logged in'
      // u = '超级管理员'
      return u
    },
    routeList () {
      if (this.$route.meta.routeList) {
        return this.$route.meta.routeList
      } else {
        return []
      }
    }
  },
  data () {
    return {
      lastIsCollapse: false,
      isFullScreen: false,
      fullScreen: require('@/assets/icon/full_screen.png'),
      fullScreenExit: require('@/assets/icon/full_screen_exit.png')
    }
  },
  watch: {
  },
  methods: {
    clickCommand (command) {
      if (command === 'loginout') {
        user.clean()
        this.$router.push('/login')
      }
    },
    clickChangeScreen () {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        this.lastIsCollapse = this.isCollapse
        this.isCollapse = true

        let docElm = document.documentElement
        if (docElm.requestFullscreen) {
          // W3C
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          // FireFox
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          // Chrome等
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          // IE11
          docElm.msRequestFullscreen()
        }
      } else {
        this.isCollapse = this.lastIsCollapse
        if (document.exitFullscreen) {
          // W3C
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          // FireFox
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          // Chrome等
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          // IE11
          document.msExitFullscreen()
        }
      }
    }
  }
}
</script>

<style scoped rel="stylesheet">
.m-header {
  height: 48px;
  background: #fff;
  border-bottom: solid 1px #cdcdcd;
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  transition: 0.3s left ease-in-out;
}
.m-left {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 10px;
}
.m-header.m-collapse {
  left: 64px;
}
.m-left .m-collapse_icon {
  transform: rotate(0deg);
  transition-duration: 0.3s;
}
.m-left .m-collapse_icon.m-collapse {
  transform: rotate(-180deg);
}
.m-left .m-breadcrumb {
  display: inline-block;
  height: 26px;
  line-height: 31px;
  margin-left: 10px;
}
.m-right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.m-right .m-tools {
  padding-right: 10px;
}
.m-right .m-tools img {
  padding-top: 10px;
  padding-right: 10px;
}
.m-right .m-user {
  display: inline-block;
}
.m-right .m-user .m-user-logo {
  vertical-align: middle;
  border-radius: 50%;
}
</style>
