/* eslint-disable space-before-function-paren no-trailing-spaces */
export default {
  /**
   * 检查值是否为空
   * @param {*} val
   */
  isEmpty (val) {
    let type = typeof val
    if (type === 'string' || type === 'number') {
      let v = val.toString()
      return v === null || v.length === 0
    } else if (val instanceof Array) return val === null || val.length === 0
    else return !!val
  },
  /**
   * 检查英数字（包括减号和下划线）
   * @param {*} str
   */
  isEnNum (str) {
    var regex = /^[A-Za-z0-9_-]+$/
    return regex.test(str)
  },
  /**
   * 是否为正整数
   * @param {*} num
   */
  isPInt (num) {
    return /(^[1-9]\d*$)/.test(num)
  },
  /**
   * 校验邮件
   * @param {*} email
   */
  isEmail (email) {
    let reg = /\w+@[a-z0-9]+\.[a-z]{2,4}/
    if (!reg.test(email)) {
      return false
    }
    return true
  }
}
