/* eslint-disable space-before-function-paren */
export default {
  /**
   * 根报元素中指定字段排序（正序）
   * @param {*} objArr
   * @param {*} field    sort field
   * @returns
   */
  sortByField(objArr, field) {
    function compare(property) {
      return function(a, b) {
        let value1 = a[property]
        let value2 = b[property]
        return value1 - value2
      }
    }
    return objArr.sort(compare(field))
  },

  /**
   * 根报元素中指定字段排序（倒序）
   * @param {*} objArr
   * @param {*} field    sort field
   * @returns
   */
  sortByFieldInReverseOrder(objArr, field) {
    function compare(property) {
      return function(a, b) {
        let value1 = a[property]
        let value2 = b[property]
        return value2 - value1
      }
    }
    return objArr.sort(compare(field))
  },

  /**
   * 转换为二维数组
   * Split into two-dimensional arrays
   * @param {*} arr
   * @param {*} colomns 多少长度一组
   */
  convertTda(arr, colomns) {
    let result = []
    for (let i = 0, len = arr.length; i < len; i += colomns) {
      result.push(arr.slice(i, i + colomns))
    }
    return result
  }
}
