/* eslint-disable space-before-function-paren */
export default {
  /**
   * 获取byte长度
   * @param {*} str
   */
  getByteLength(str) {
    return str.replace(/[\u0391-\uFFE5]/g, str).length
  },
  /**
   * 右侧补全
   * @param {*} str
   * @param {*} size
   * @param {*} padStr
   */
  rightPad(str, size, padStr) {
    let sub = str
    if (sub === null) sub = ''
    if (sub.length >= size) return sub
    let append = function() {
      sub += padStr
      if (sub.length < size) {
        append()
      }
    }
    append()
    return sub
  },
  /**
   * 清除空格
   * @param {*} str
   */
  trim(str) {
    return str.replace(/^\s+|\s+$/g, '')
  },
  /**
   * 清除右侧指定字符
   * @param {*} str
   * @param {*} char
   */
  rTrim(str, char) {
    return str.replace(new RegExp('\\' + char + '+$', 'g'), '')
  },
  /**
   * 清除左侧指定字符
   * @param {*} str
   * @param {*} char
   */
  lTrim(str, char) {
    return str.replace(new RegExp('^\\' + char + '+', 'g'), '')
  },
  /**
   * 全角转半角
   * @param {*} str
   */
  toCDB (str) {
    let tmp = ''
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
      } else {
        tmp += String.fromCharCode(str.charCodeAt(i))
      }
    }
    return tmp
  }
}
