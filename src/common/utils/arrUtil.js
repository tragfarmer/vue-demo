/* eslint-disable space-before-function-paren */
export default {
  /**
   * 通过数字无素对象的字段排序（正序）
   * Object Array Sorting
   * @param {*} objArr
   * @param {*} field    sort field
   * @returns
   */
  sortByObjField(objArr, field) {
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
   * 通过数字无素对象的字段排序（倒序）
   * Object Array Sorting
   * @param {*} objArr
   * @param {*} field    sort field
   * @returns
   */
  sortByObjFieldReverseOrder(objArr, field) {
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
   * 将数组切割为二维数字
   * Split into two-dimensional arrays
   * @param {*} arr
   * @param {*} count
   */
  intoDyadicArr(arr, colomns) {
    let result = []
    for (let i = 0, len = arr.length; i < len; i += colomns) {
      result.push(arr.slice(i, i + colomns))
    }
    return result
  }
}
