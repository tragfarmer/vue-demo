<template>
  <div class="m-wrap">

    <div>
      <h2>Vuex： 一个专为 Vue.js 应用程序开发的状态管理模式</h2>
      详细文档：<br />
      <a target="_blank"
         href="https://vuex.vuejs.org/zh/api/#state">
        https://vuex.vuejs.org/zh/api/#state
      </a>
    </div>

    <!-- <div class="m-course">
      <div class="m-group-title">
        <strong></strong>
      </div>

      <div>
        <div class="m-step-title">
          <strong></strong>
        </div>
        <pre>
        </pre>
      </div>

      <div>
        <div class="m-step-title">
          <strong></strong>
        </div>
        <pre>
        </pre>
      </div>

      <div>
        <div class="m-step-title">
          <strong></strong>
        </div>
        <pre>
        </pre>
      </div>
    </div> -->

    <div class="m-example">
      <el-button @click="decrement">-1</el-button>
      {{ count }}
      <el-button @click="add">+1</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'vuexDemo',
  props: {},
  components: {},
  data () {
    return {
    }
  },
  computed: {
    count () {
      return this.$store.state.vuexDemo.count
    }
  },
  watch: {},
  created () { },
  mounted () {
  },
  methods: {
    ...mapActions({
      add: 'increment',
      decrement: 'decrement'
    })
  }
}
</script>

<style scoped rel="stylesheet">
.inline_block {
  display: inline-block;
}
</style>
