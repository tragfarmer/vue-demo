/* eslint-disable space-before-function-paren */
export default {
  isEmpty(str) {
    return str === null || str.trim().length === 0
  },
  repeat(ch, repeatTimes) {
    var result = ''
    for (var i = 0; i < repeatTimes; i++) {
      result += ch
    }
    return result
  },
  getByteLength(str) {
    return str.replace(/[\u0391-\uFFE5]/g, str).length
  },
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
  trim(str) {
    return str.replace(/^\s+|\s+$/g, '')
  },
  rTrim(str, char) {
    return str.replace(new RegExp('\\' + char + '+$', 'g'), '')
  },
  tTrim(str, char) {
    return str.replace(new RegExp('^\\' + char + '+', 'g'), '')
  }
}
