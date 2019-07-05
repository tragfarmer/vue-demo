/* eslint-disable space-before-function-paren */

export default {
  getCookie(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) return arr[2]
    else return null
  },

  setCookie(name, value, expiredays) {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    let expires = expiredays ? ';expires=' + exdate : ''
    document.cookie = name + '=' + value + expires
  },

  delCookie(name) {
    let exdate = new Date()
    exdate.setTime(exdate.getDate() - 1)
    let cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exdate
    }
  }
}
