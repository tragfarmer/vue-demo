/* eslint-disable space-before-function-paren */
export default {
  methods: {
    /**
     * 获取数据级权限许可证
     * @param {*} name 该操作权限所命名的key值
     */
    permission(name) {
      let flag = true
      let authority = this.$route.meta.authority
      if (authority) {
        let permission = authority.permission
        if (permission.indexOf(name) === -1) flag = false
      }
      return flag
    }
  }
}
