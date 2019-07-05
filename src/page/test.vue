<template>
  <div>
    <input @blur="isFocus = false"
           @focus="isFocus = true"
           v-shortcut="{valid: isFocus, fn: callShortcut}"
           type="text">
    <br />
    <input @blur="isFocus1 = false"
           @focus="isFocus1 = true"
           v-shortcut="{valid: isFocus1, fn: callShortcut1}"
           type="text">
    <ul v-shortcut:document="{ valid: true, fn: callShortcut2 }">
      <li style="margin: 5px;"
          v-for="(v, i) in arr"
          :key="i"
          :class="v.sel ? 'selected' : ''"
          @click="clickSelected(v, i)">
        {{ v.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {},
  components: {},
  data () {
    return {
      isFocus: false,
      isFocus1: false,
      ctrlDown: false,
      arr: [{
        id: 1,
        value: '11111',
        sel: false
      }, {
        id: 2,
        value: '22222',
        sel: false
      }, {
        id: 3,
        value: '33333',
        sel: false
      }, {
        id: 4,
        value: '44444',
        sel: false
      }, {
        id: 5,
        value: '55555',
        sel: false
      }],
      selArr: []
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    callShortcut (keyValue, e) {
      if (keyValue) {
        console.log('-keyValue-', keyValue)
        return false
      } else {
        return true
      }
    },
    callShortcut1 (keyValue, e) {
      if (keyValue) {
        console.log('-keyValue1-', keyValue)
        return false
      } else {
        return true
      }
    },
    callShortcut2 (keyValue, e) {
      this.ctrlDown = e.ctrlKey
      return false
    },
    clickSelected (v) {
      v.sel = !v.sel
      if (this.ctrlDown) {
        if (v.sel) {
          this.selArr.push(v)
        } else {
          for (let i = this.selArr.length - 1; i >= 0; i--) {
            if (this.selArr[i].id === v.id) {
              this.selArr.splice(i, 1)
              break
            }
          }
        }
      } else {
        for (let i = this.selArr.length - 1; i >= 0; i--) {
          this.selArr[i].sel = false
        }
        if (v.sel) {
          this.selArr = [v]
        } else {
          this.selArr = []
        }
      }
    }
  }
}
</script>

<style scoped rel="stylesheet">
.selected {
  background: red;
}
</style>
