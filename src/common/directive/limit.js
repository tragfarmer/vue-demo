/* eslint-disable space-before-function-paren */

/**
 * use：
 * v-e-number:3="{fn: v => { input = v }}"
 */
import Vue from 'vue'

Vue.directive('eNumber', {
  inserted: function(el, binding, vnode) {
    function ToCDB(str) {
      var tmp = ''
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
          tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
        } else {
          tmp += String.fromCharCode(str.charCodeAt(i))
        }
      }
      return tmp
    }

    el.addEventListener('input', function(e) {
      let v = e.target.value
      v = ToCDB(v)
      // console.log('e', e)
      // console.log('v', v)
      // console.log('binding', binding)
      let max = parseInt(binding.arg)
      let vv = v.replace(/[^\d]/gi, '') + ''
      if (vv.length > max) {
        vv = vv.substring(0, max)
      }
      // console.log('vv', vv)
      binding.value.fn(vv)
      e.target.value = vv
    })
  }
})
