<template>
  <div>
    <m-sidebar :isCollapse="isCollapse"></m-sidebar>
    <m-header v-model="isCollapse"></m-header>
    <div :class="isCollapse ? 'm-page m-collapse m-width' : 'm-page m-width'">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import mHeader from './header.vue'
import mSidebar from './sidebar.vue'
export default {
  components: {
    mHeader, mSidebar
  },
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style scoped rel="stylesheet">
.m-page {
  position: absolute;
  background: #f2f6fc;
  left: 200px;
  right: 0;
  top: 49px;
  bottom: 0;
  overflow-y: scroll;
  transition: 0.3s left ease-in-out;
  padding: 10px;
}
.m-page.m-collapse {
  left: 64px;
}
</style>
