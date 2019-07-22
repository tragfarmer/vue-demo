/* eslint-disable space-before-function-paren */
/* eslint-disable no-trailing-spaces */
export default {
  /**
   * @param {*} obj 接收一个任意数据
   * @returns 返回这个任意数据的数据类型
   */
  getType (obj) {
    let type = typeof obj
    if (type === 'object') {
      let typeString = Object.prototype.toString.call(obj)
      if (typeString === '[object Array]') type = 'Array'
      else if (typeString === '[object Date]') type = 'Date'
      else if (typeString === '[object RegExp]') type = 'RegExp'
    }
    return type
  },

  /**
   * 用于克隆正则对象
   * clone 函数使用，外部基本用不着。
   * @param {*} re 
   */
  _getRegExp (re) {
    let flags = ''
    if (re.global) flags += 'g'
    if (re.ignoreCase) flags += 'i'
    if (re.multiline) flags += 'm'
    return flags
  },

  /**
   * 对象克隆
   */
  clone (obj) {
    let type = this.getType(obj)
    if (type !== 'object') return obj
    let newObj = type === 'Array' ? [] : {}
    for (let i in obj) {
      let val = obj[i]
      if (type === 'Date') {
        newObj[i] = new Date(val.valueOf())
      } else if (type === 'RegExp') {
        newObj[i] = new RegExp(parent.source, this._getRegExp(parent))
      } else if (type === 'object') {
        newObj[i] = this.clone(val)
      } else {
        newObj[i] = val
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
  }
}
