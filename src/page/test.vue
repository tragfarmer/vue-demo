<template>
  <div>
    <button @click="clickTest1">test1</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {},
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    checkEnNum (str) {
      var regex = /^[A-Za-z0-9_-]+$/
      return regex.test(str)
    },
    clickTest1 () {
      let tmpHenpinNo = '2-001213_a'
      console.log('b', this.checkEnNum(tmpHenpinNo))
    }
  }
}
</script>

<style scoped rel="stylesheet">
</style>
