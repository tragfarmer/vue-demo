/* eslint-disable space-before-function-paren */
export default {
  /**
   * 日期格式化
   * Date()).Format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
   * (new Date()).Format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
   * (new Date()).Format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
   * (new Date()).Format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
   * (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
   */
  format (date, fmt) {
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds()
    }
    let week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length > 1
          ? RegExp.$1.length > 2
            ? '/u661f/u671f'
            : '/u5468'
          : '') + week[date.getDay() + '']
      )
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  },

  /**
   * 日期字符串转日期对象
  * @param dateStr  yyyy-MM-dd hh:mm:ss
  * @returns {Date}
  */
  toDate (dateStr) {
    let t = Date.parse(dateStr)
    if (!isNaN(t)) {
      return new Date(Date.parse(dateStr.replace(/-/g, '/')))
    } else {
      return null
    }
  },

  /**
   * 获取今天时间字符串
   */
  today () {
    return this.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
  },

  /**
   * 时间增量
   * @param {*} date
   * @param {*} minutes （单位：分）
   */
  add (date, minutes) {
    return date.getTime() + minutes * 60 * 1000
  },

  /**
   * 获取相对时间（例1：昨天 17:14，例2：2天前 17:14）
   */
  formatByRelativeTime (date) {
    let relativeTimeStr = ''
    let d1 = new Date(date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate())
    let today = new Date()
    let d2 = new Date(today.getFullYear() + '/' + today.getMonth() + 1 + '/' + today.getDate())
    let iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24
    if (iday === 1) {
      relativeTimeStr = '昨天 '
    } else if (iday > 1) {
      relativeTimeStr = iday + '天前 '
    } else if (iday === -1) {
      relativeTimeStr = '明天 '
    } else if (iday < -1) {
      relativeTimeStr = iday + '天后 '
    }
    return relativeTimeStr + d1.getHours() + ':' + d1.getMinutes()
  },

  /**
   * 日期比较
   * @param date
   * @returns {number}
   * date1 > date2 : 1
   * date1 < date2 : -1
   * date1 == date2 : 0
   */
  compare (date1, date2) {
    let s = Date.parse(date1)
    let e = Date.parse(date2)
    if (s > e) return 1
    else if (s < e) return -1
    else return 0
  },

  /**
   * 计算一个日期距今天的时间差
   * @returns 毫秒数
   */
  howLongAgo (dateBegin) {
    let today = new Date()
    let dateDiff = today.getTime() - dateBegin.getTime()
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) // Math.floor() ： 向下取整
    let leave1 = dateDiff % (24 * 3600 * 1000)
    let hours = Math.floor(leave1 / (3600 * 1000))
    let leave2 = leave1 % (3600 * 1000)
    let minutes = Math.floor(leave2 / (60 * 1000))
    let leave3 = leave2 % (60 * 1000)
    let seconds = Math.round(leave3 / 1000)
    return (dayDiff * 24 * 3600 + hours * 3600 + minutes * 60 + seconds) * 1000
    // console.log( ' 相差 ' + dayDiff + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒' )
  }
}
