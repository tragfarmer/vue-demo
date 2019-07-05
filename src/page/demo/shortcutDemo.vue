<template>
  <div class="m-wrap">
    <div>
      <h2>shortcut：自定义的快捷键指令</h2>
    </div>

    <div class="m-course">
      <div class="m-group-title">
        <strong>使用方法</strong>
      </div>

      <div>
        <div class="m-step-title">
          <strong>main.js中引入</strong>
        </div>
        <pre>
          import '@/common/directive/shortcut.js'
        </pre>
      </div>

      <div>
        <div class="m-step-title">
          <strong>input标签上使用</strong>
        </div>
        <pre>
          v-shortcut="{ fn: callShortcut }"</pre>
        <div class="m-example">
          <div class="m-example-title">
            <strong>演示</strong>
          </div>
          <pre>
            进入画面时创建事件，关闭画面时删除事件，input有焦点时生效，无焦点时不触发事件
            在input焦点时，可使用ctrl，shift，alt + 数字组合快捷键
            回调参数返回false，则禁用该快捷键原有的事件，否则返回true
          </pre>
          <div>
            <div>input1</div>
            <input v-shortcut="{fn: callShortcut}"
                   type="text">
            <div>input2</div>
            <input v-shortcut="{fn: callShortcut1}"
                   type="text">
          </div>
        </div>
      </div>

      <div>
        <div class="m-step-title">
          <strong>非input标签上使用</strong>
        </div>
        <pre>
          v-shortcut:document="{ valid: true, fn: callShortcut }"</pre>
        <div class="m-example">
          <div class="m-example-title">
            <strong>演示</strong>
          </div>
          <pre>
            与input标签上使用的差别
            多了两个参数，‘document’ 和 ‘valid’
            该指令在 valid 为 true 时，通过 document 创建快捷键事件，因此多处使用此指令，则最后 valid 为 true 的生效。
            一个画可以多处使用，请保持只有一个 valid 为 true, 可动态设置 valid 参数。
          </pre>
          <div>
            <div>
              <label><input name="demoRadio" type="radio" value="1" v-model="demoRadioSel"/>Demo1</label>
              <label><input name="demoRadio" type="radio" value="2" v-model="demoRadioSel"/>Demo2</label>
            </div>
            <div>Demo1可全选：单选和多选（压下ctrl键）</div>

            <ul v-shortcut:document="{ valid: demoRadioSel == '1', fn: callShortcut2 }">
              <li style="margin: 5px;"
                  v-for="(v, i) in arr1"
                  :key="i"
                  :class="v.sel ? 'selected' : ''"
                  @click="clickSelected1(v, i)">
                {{ v.value }}
              </li>
            </ul>

            <div>Demo2可全选：单选和多选（压下ctrl键）</div>
            <ul v-shortcut:document="{ valid: demoRadioSel == '2', fn: callShortcut2 }">
              <li style="margin: 5px;"
                  v-for="(v, i) in arr2"
                  :key="i"
                  :class="v.sel ? 'selected' : ''"
                  @click="clickSelected2(v, i)">
                {{ v.value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shortcutDemo',
  props: {},
  components: {},
  data () {
    return {
      isFocus: false,
      isFocus1: false,
      ctrlDown: false,
      arr1: [{
        id: 1,
        value: '11111',
        sel: true
      }, {
        id: 2,
        value: '22222',
        sel: false
      }, {
        id: 3,
        value: '33333',
        sel: false
      }],
      arr2: [{
        id: 1,
        value: '11111',
        sel: true
      }, {
        id: 2,
        value: '22222',
        sel: false
      }, {
        id: 3,
        value: '33333',
        sel: false
      }],
      demoRadioSel: '1',
      selArr1: [],
      selArr2: []
    }
  },
  computed: {},
  watch: {
  },
  created () { },
  mounted () {
    this.selArr1 = [this.arr1[0]]
    this.selArr2 = [this.arr2[0]]
  },
  methods: {
    callShortcut (keyValue, e) {
      if (keyValue) {
        alert('input1:' + keyValue)
        return false
      } else {
        return true
      }
    },
    callShortcut1 (keyValue, e) {
      if (keyValue) {
        alert('input2:' + keyValue)
        return false
      } else {
        return true
      }
    },
    callShortcut2 (keyValue, e) {
      this.ctrlDown = e.ctrlKey
      console.log('ctrlDown', this.ctrlDown)
      return true
    },
    clickSelected1 (v) {
      console.log('Demo1 选择', v)
      v.sel = !v.sel
      if (this.demoRadioSel === '1' && this.ctrlDown) {
        if (v.sel) {
          this.selArr1.push(v)
        } else {
          for (let i = this.selArr1.length - 1; i >= 0; i--) {
            if (this.selArr1[i].id === v.id) {
              this.selArr1.splice(i, 1)
              break
            }
          }
        }
      } else {
        for (let i = this.selArr1.length - 1; i >= 0; i--) {
          this.selArr1[i].sel = false
        }
        if (v.sel) {
          this.selArr1 = [v]
        } else {
          this.selArr1 = []
        }
      }
      return true
    },
    clickSelected2 (v) {
      console.log('Demo2 选择', v)
      v.sel = !v.sel
      if (this.demoRadioSel === '2' && this.ctrlDown) {
        if (v.sel) {
          this.selArr2.push(v)
        } else {
          for (let i = this.selArr2.length - 1; i >= 0; i--) {
            if (this.selArr2[i].id === v.id) {
              this.selArr2.splice(i, 1)
              break
            }
          }
        }
      } else {
        for (let i = this.selArr2.length - 1; i >= 0; i--) {
          this.selArr2[i].sel = false
        }
        if (v.sel) {
          this.selArr2 = [v]
        } else {
          this.selArr2 = []
        }
      }
      return true
    }
  }
}
</script>

<style scoped rel="stylesheet">
.selected {
  background: red;
}
</style>
