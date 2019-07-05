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
 * input 标签上使用
 * v-shortcut="{fn: callShortcut}"
 *
 * 非input标签使用
 * v-shortcut:document="{ valid: true, fn: callShortcut2 }"
 * -----------
 * callShortcut(keyValue) {
 *  console.log('-keyValue-', keyValue)
 *  // 返回 false 禁用快捷键原有(浏览器的)事件，返 true 则不禁用。
 *  return false
 * }
 */
Vue.directive('shortcut', {
  bind: function (el, binding, vnode) {
    _setEvent(el, binding)
  },
  // inserted: function (el, binding, vnode) {
  // },
  update: function (el, binding, vnode) {
    _setEvent(el, binding)
  },
  // componentUpdated: function (el, binding, vnode) {
  // },
  unbind: function (el, binding) {
    _closeEvent(el, binding)
  }
})

function _setEvent (el, binding) {
  if (binding.arg === 'document') {
    el = document
    // 有效标记，为 true 时才有快捷键监听
    if (binding.value.valid) {
      el.call = binding.value.fn
      _createEvent(el, binding)
    }
  } else {
    el.call = binding.value.fn
    _createEvent(el, binding)
  }
}

function _createEvent (el, binding) {
  if (binding.arg === 'document' || (!el.onkeydown) || (!el.onkeyup)) {
    // 按键压下时触发
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
      if (el.call && !el.call(keyValue, e)) {
        event.preventDefault()
        window.event.returnValue = false
      }
    }
    // 按键弹起时触发
    el.onkeyup = function (event) {
      let e = event || window.event
      let keyValue = null
      if (el.call && !el.call(keyValue, e)) {
        event.preventDefault()
        window.event.returnValue = false
      }
    }
  }
}

function _closeEvent (el, binding) {
  if (binding.arg === 'document') el = document
  el.onkeydown = null
  el.onkeyup = null
}

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
    } else if (code === 'KeyE') {
      keyValue = key + ' + E'
    } else if (code === 'KeyR') {
      keyValue = key + ' + R'
    }
  }
  return keyValue
}
