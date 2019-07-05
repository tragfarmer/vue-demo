import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * meta: 所有参数
 * meta: { title: '', isLogin: true, crumbs: [], showBack: true }
 * title:    标题
 * isLogin:  是否要求登录后才能进入，非必填，默认为：false
 * crumbs：  面包屑，非必填，默认为：[title]
 * showBack: 显示返回按钮，非必填，默认为：false)
 */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      meta: { title: '登录' },
      component: resolve => require(['@/page/login.vue'], resolve)
    },
    {
      path: '/readme',
      component: resolve => require(['@/components/home.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'readme',
          meta: { isLogin: true, title: '自述' },
          component: resolve => require(['@/page/readme.vue'], resolve)
        },
        {
          path: '/demo/permissionTest',
          name: 'permissionTest',
          meta: { isLogin: true, title: '权限测式' },
          component: resolve => require(['@/page/demo/permissionTest.vue'], resolve)
        },
        {
          path: '/demo/shortcutDemo',
          name: 'shortcutDemo',
          meta: { isLogin: true, title: '快捷键指令' },
          component: resolve => require(['@/page/demo/shortcutDemo.vue'], resolve)
        },
        {
          path: '/plugin/vuexDemo',
          name: 'vuexDemo',
          meta: { isLogin: true, title: 'Vuex demo' },
          component: resolve => require(['@/page/plugin/vuexDemo.vue'], resolve)
        },
        {
          path: '/plugin/echartsDemo',
          name: 'echartsDemo',
          meta: { isLogin: true, title: 'ECharts demo' },
          component: resolve => require(['@/page/plugin/echartsDemo.vue'], resolve)
        },
        {
          path: '/test',
          name: 'test',
          meta: { isLogin: true, title: 'Test' },
          component: resolve => require(['@/page/test.vue'], resolve)
        }
      ]
    },
    {
      path: '/note',
      name: 'note',
      meta: { title: 'note' },
      component: resolve => require(['@/page/note.vue'], resolve)
    },
    {
      path: '/err401',
      meta: { title: '401' },
      component: resolve => require(['@/page/error/err401.vue'], resolve)
    },
    {
      path: '/err404',
      meta: { title: '404' },
      component: resolve => require(['@/page/error/err404.vue'], resolve)
    },
    {
      path: '/*',
      redirect: 'err404'
    }
  ]
})
