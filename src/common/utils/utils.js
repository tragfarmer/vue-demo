/* eslint-disable space-before-function-paren */
export default {
  /**
  * 是否为空
  */
  isEmpty (obj) {
    return !obj || obj.length === 0
  },
  /**
   * 对象克隆
   */
  clone (obj) {
    if (typeof obj !== 'object') return obj
    let newObj = obj instanceof Array ? [] : {}
    for (let i in obj) {
      let val = obj[i]
      if (val instanceof Date) {
        newObj[i] = new Date(val.valueOf())
      } else if (!val) {
        newObj[i] = val
      } else {
        newObj[i] = typeof val === 'object' ? this.clone(val) : val
      }
    }
    return newObj
  },

  /**
   * 接收元素节点以编辑该节点的文本内容。
   * 一般用于做双击编辑，一个元素双击后将元素节点传入该方法，即可实现编辑，离开焦点后即可得到编辑后的最内容
   * Receive an element node to edit the text content of that node
   * @param {*} element
   */
  editText (element, callback) {
    let oldHtml = element.innerHTML
    let newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.value = oldHtml
    newInput.className = 'edit_text'

    // 清空当前元素的文本内容
    element.innerHTML = ''
    // 把新的 input 框 追加到当前元素节点中
    element.appendChild(newInput)
    // 设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
    newInput.setSelectionRange(0, oldHtml.length)
    // 为新 input 框获取焦点
    newInput.focus()
    // 为新的 input 添加失去焦点事件
    newInput.onblur = function () {
      // 判断失去焦点时，input 框的值是否与原值相同，相同则表示没有修改，返回原值；不同则表示有改动，返回新值
      if (this.value === oldHtml) {
        element.innerHTML = oldHtml
      } else {
        element.innerHTML = this.value
        callback(this.value)
      }
    }
  },

  /**
   * 复制到粘贴板
   * @param {*} str
   */
  copyClipboard (str) {
    let oInput = document.createElement('input')
    oInput.value = str
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
    oInput.style.display = 'none'
    document.body.removeChild(oInput)
  },

  /**
   * form 域内容记录，用于校验 form 内容变更。
   * @param {*} els
   * this.$refs[formName].$el.elements
   */
  formContentRecord (els) {
    for (let el of els) {
      let type = el.type
      if (type === 'checkbox' || type === 'radio') {
        el.defaultChecked = el.checked
      } else if (
        type === 'hidden' ||
        type === 'password' ||
        type === 'text' ||
        type === 'textarea'
      ) {
        el.defaultValue = el.value
      } else if (type === 'select-one' || type === 'select-multiple') {
        for (let opt of el.options) {
          opt.defaultSelected = opt.selected
        }
      }
    }
  },
  /**
   * form 内容是否有变更
   * @param {*} els
   * this.$refs[formName].$el.elements
   * @returns
   * From has changed：true
   * From unchanged：false
   */
  formContentIsChange (els) {
    for (let el of els) {
      let type = el.type
      if (type === 'checkbox' || type === 'radio') {
        if (el.checked !== el.defaultChecked) {
          console.log('Form element change by the' + el)
          return true
        }
      } else if (
        type === 'hidden' ||
        type === 'password' ||
        type === 'text' ||
        type === 'textarea'
      ) {
        if (el.value !== el.defaultValue) {
          console.log('Form element change by the' + el)
          return true
        }
      } else if (type === 'select-one' || type === 'select-multiple') {
        for (let opt of el.options) {
          if (opt.selected !== opt.defaultSelected) {
            console.log('Form element change by the' + el)
            return true
          }
        }
      }
    }
    return false
  }
}
