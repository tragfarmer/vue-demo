<template>
  <div>
    <div>
      <button @click="clickTest1">test1</button>
      <button @click="clickTest2">test2</button>
      <button @click="clickTest3">test3</button>
    </div>
    <form action="---"
          method="get"
          ref="testForm">
      <input type="checkbox"
             name="checkbox"
             value="checkbox"><br />
      <input type="radio"
             name="radio"
             value="radio"><br />
      <input type="file"
             name="file"
             value="file"><br />
      <input type="text"
             name="text"
             value="text"><br />
      <input type="password"
             name="password"
             value="password"><br />
      <input type="hidden"
             name="hidden"
             value="hidden"><br />
      <!-- <input type="image" name="image" src="../assets/icon/user.jpg"><br/> -->
      <input type="reset"
             name="reset"
             value="reset"><br />
      <input type="button"
             name="button"
             value="button"><br />
      <input type="submit"
             name="submit"
             value="submit"><br />
      <button>dddd</button>
    </form>
  </div>
</template>

<script>
import cUtil from '@/common/utils/checkUtil.js'
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
  mounted () {
    let testForm = this.$refs.testForm
    let isChange = false
    let els = testForm.elements
    cUtil.changeInForm(els, (boo) => { isChange = boo })
    testForm.onsubmit = function () {
      if (isChange) {
        console.log('内容有变更')
      } else {
        console.log('内容无变更')
      }
      return false
    }
  },
  methods: {
    clickTest1 () {
      for (let i = 0; i < 2; i++) {
        this.$req.login().then((response) => {
          console.log(response)
        }).catch(() => {
          // console.log('err:', err)
        })
      }
    },
    clickTest2 () {
    },
    clickTest3 () {
    }
  }
}
</script>

<style scoped rel="stylesheet">
</style>
