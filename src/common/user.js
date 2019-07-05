/* eslint-disable space-before-function-paren */
const USER_KEY = 'm_userinfo'
const MENUS_KEY = 'm_menus'
const AUTHORITY_KEY = 'm_authority'
let subUser = null
let subMenus = null
let subAuthorityMap = null
export default {
  isLogin() {
    let user = this.getUser()
    if (user && user.token) return true
    else return false
  },
  saveUser(user) {
    subMenus = null
    if (user && user.token) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    }
  },
  getUser() {
    if (!subUser) {
      let sub = sessionStorage.getItem(USER_KEY)
      if (sub && sub.length !== 0) {
        subUser = JSON.parse(sub)
      }
    }
    return subUser
  },

  saveMenus(menus) {
    subMenus = null
    if (menus && menus.length !== 0) {
      sessionStorage.setItem(MENUS_KEY, JSON.stringify(menus))
    }
  },
  getMenus() {
    if (!subMenus) {
      let sub = sessionStorage.getItem(MENUS_KEY)
      if (sub && sub.length !== 0) {
        subMenus = JSON.parse(sub)
      }
    }
    return subMenus
  },

  saveAuthorityList(authorityList) {
    subAuthorityMap = null
    if (authorityList && authorityList.length !== 0) {
      sessionStorage.setItem(AUTHORITY_KEY, JSON.stringify(authorityList))
    }
  },
  // 获取授权map
  _getAuthorityMap() {
    if (!subAuthorityMap) {
      let sub = sessionStorage.getItem(AUTHORITY_KEY)
      if (sub && sub.length !== 0) {
        let authorityList = JSON.parse(sub)
        subAuthorityMap = {}
        for (let i = 0, len = authorityList.length; i < len; i++) {
          subAuthorityMap[authorityList[i].name] = authorityList[i]
        }
      }
    }
    return subAuthorityMap
  },
  getAuthority(to) {
    let map = this._getAuthorityMap()
    let authority = map[to.name]
    return authority
  },

  clean() {
    sessionStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(MENUS_KEY)
    sessionStorage.removeItem(AUTHORITY_KEY)
    subUser = null
    subMenus = null
    subAuthorityMap = null
  }
}
