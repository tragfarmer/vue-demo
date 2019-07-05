/* eslint-disable space-before-function-paren */

/**
 */
import Vue from 'vue'

const CTRL = 'Ctrl'
const ALT = 'Alt'
const SHIFT = 'Shift'
// キー0~9のkeycode
const KEY09 = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]

/**
 * use:
 * v-shortcut="{valid: isFocus, fn: callShortcut}"
 * -----------
 * 实例，input焦点时快捷键监听：
 * <input @blur="isFocus = false" @focus="isFocus = true" v-shortcut="{valid: isFocus, fn: callShortcut}" type="text">
 * callShortcut(keyValue) {
 *  console.log('-keyValue-', keyValue)
 *  // 返回 false 禁用快捷键原有(浏览器的)事件，返 true 则不禁用。
 *  return false
 * }
 */
Vue.directive('shortcut', {
  // bind: function (el, binding, vnode) {
  // },
  // inserted: function (el, binding, vnode) {
  // },
  update: function (el, binding, vnode) {
    // 有效标记，为 true 时才有快捷键监听
    let valid = binding.value.valid
    if (valid) {
      // 回调，监听到快捷键时触发回调
      let fn = binding.value.fn
      console.log('flag', binding.value.flag)
      el.onkeydown = function (event) {
        let e = event || window.event
        let keyCode = e.keyCode || e.which
        let code = e.code
        let keyValue = null
        if (e.ctrlKey) {
          keyValue = _getCombinationKey(CTRL, keyCode, code)
        } else if (e.altKey) {
          keyValue = _getCombinationKey(ALT, keyCode, code)
        } else if (e.shiftKey) {
          keyValue = _getCombinationKey(SHIFT, keyCode, code)
        }
        if (keyValue && !fn(keyValue)) {
          event.preventDefault()
          window.event.returnValue = false
        }
      }
    }
  },
  // componentUpdated: function (el, binding, vnode) {
  // },
  unbind: function (el) {
    el.onkeydown = undefined
  }
})

function _getCombinationKey (key, keyCode, code) {
  let keyValue = null
  switch (keyCode) {
    case KEY09[0]:
      keyValue = key + ' + 0'
      break
    case KEY09[1]:
      keyValue = key + ' + 1'
      break
    case KEY09[2]:
      keyValue = key + ' + 2'
      break
    case KEY09[3]:
      keyValue = key + ' + 3'
      break
    case KEY09[4]:
      keyValue = key + ' + 4'
      break
    case KEY09[5]:
      keyValue = key + ' + 5'
      break
    case KEY09[6]:
      keyValue = key + ' + 6'
      break
    case KEY09[7]:
      keyValue = key + ' + 7'
      break
    case KEY09[8]:
      keyValue = key + ' + 8'
      break
    case KEY09[9]:
      keyValue = key + ' + 9'
      break
    case 69:
      keyValue = key + ' + E'
      break
    case 82:
      keyValue = key + ' + R'
      break
    case 13:
      keyValue = key + ' + Enter'
      break
  }
  if (!keyValue) {
    if (code === 'Digit1') {
      keyValue = key + ' + 1'
    } else if (code === 'Digit2') {
      keyValue = key + ' + 2'
    } else if (code === 'Digit3') {
      keyValue = key + ' + 3'
    } else if (code === 'Digit4') {
      keyValue = key + ' + 4'
    } else if (code === 'Digit5') {
      keyValue = key + ' + 5'
    } else if (code === 'Digit6') {
      keyValue = key + ' + 6'
    } else if (code === 'Digit7') {
      keyValue = key + ' + 7'
    } else if (code === 'Digit8') {
      keyValue = key + ' + 8'
    } else if (code === 'Digit9') {
      keyValue = key + ' + 9'
    } else if (code === 'Digit0') {
      keyValue = key + ' + 0'
    }
  }
  return keyValue
}
