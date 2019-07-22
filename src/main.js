// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/main.css'
import '@/assets/css/medit.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import User from '@/common/user.js'
import Req from '@/common/req.js'
import Store from '@/vuex/index.js'
import '@/common/directive/shortcut.js'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

Vue.prototype.$store = Store
Vue.prototype.$req = Req

let routeList = []
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin && !User.isLogin()) {
    // 画面需要登录，但没有登录
    next({ path: '/' })
  } else if (!to.meta.isLogin) {
    // 画面不需要登录
    next()
  } else if (!User.getAuthority(to)) {
    // 画面没有授权
    next({ path: '/err401' })
  } else {
    // 获取画面授权
    let authority = User.getAuthority(to)
    // 把授权设置到路由meta中
    to.meta.authority = authority

    let index = -1
    for (let i = routeList.length - 1; i >= 0; i--) {
      // 如果存在路由列表，则把之后的路由都删掉
      if (to.name !== 'login' && routeList[i].name === to.name) {
        index = i
        break
      }
    }
    if (index !== -1) routeList.splice(index + 1, routeList.length - index - 1)
    else routeList.push(to)
    to.meta.routeList = routeList
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
