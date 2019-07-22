/* eslint-disable space-before-function-paren */
/* eslint-disable no-trailing-spaces */
export default {
  /**
   * 检查值是否为空
   * @param {*} val
   */
  isEmpty (v) {
    let type = typeof f
    if (type === 'string' || type === 'number') {
      let val = v.toString()
      return val === null || val.length === 0
    } else if (v instanceof Array) return v === null || v.length === 0
    else return !v
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
   * 校验邮件格式
   * @param {*} email
   */
  isEmail (email) {
    let reg = /\w+@[a-z0-9]+\.[a-z]{2,4}/
    if (!reg.test(email)) {
      return false
    }
    return true
  },
  
  /**
   * 监听form内容是否有变更
   * @param {*} els this.$refs.testForm.elements
   * @param {*} callback
   * use:
   * let isChange = false
   * let els = this.$refs.testForm.elements
   * cUtil.changeInForm(els, (boo) => { isChange = boo })
   */
  changeInForm (els, callback) {
    let isChange = true
    for (let i = 0; i < els.length; i++) {
      let name = els[i].name
      if (name !== null && name.length !== 0) {
        els[i].onchange = () => { if (callback) callback(isChange) }
      }
    }
  }
}
