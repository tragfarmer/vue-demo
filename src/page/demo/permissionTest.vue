<template>
  <div class="m-wrap">
    <div>{{ title }}</div>
    <el-button v-if="!permission('edit')" @click="clickEdit">edit</el-button>
    <el-button v-if="!permission('delete')" @click="clickDelete">delete</el-button>
    <el-button v-if="!permission('delete1')" @click="clickDelete">delete1</el-button>
  </div>
</template>

<script>
import base from '@/common/base/base.js'
export default {
  name: 'permissionTest',
  props: {},
  components: {},
  mixins: [base],
  data () {
    return {
      title: 'vue template'
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    clickEdit () {
      console.log('clickEdit')
    },
    clickDelete () {
      console.log('clickDelete')
    }
  }
}
</script>

<style>
</style>
<style scoped rel="stylesheet">
</style>
