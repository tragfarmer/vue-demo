<template>
  <div class="m-wrap">
    <article style="margin: 0; padding: 0">
      <!-- <p>基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案</p> -->
      <h2>前言</h2>
    </article>
    <ul>
      <li></li>
    </ul>
    <pre>
      本框架搭建流程和所有配置详细说明。
      主要插件版本：
      "dependencies": {
        "axios": "^0.18.0",
        "echarts": "^4.2.1",
        "element-ui": "^2.7.2",
        "vue": "^2.5.2",
        "vue-router": "^3.0.1",
        "vuex": "^3.1.0"
      },
      脚手架版本(vue -V)： 2.9.6

      一：创建工程
        1，vue init webpack vue-demo
        2，cd vue-demo
        3，cnpm install
      二：跨域配置
        1，打开config/index.js
        定位到
          proxyTable，
        替换为
          proxyTable: {
            /*
            After modifying the configuration, you must restart the project,
            otherwise the configuration will not take effect.
            */
            '/api': {
              target: 'http://127.0.0.1:9999',
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
              }
            }
          },
        注意：修改配置后，工程一定要重启，不然无法生效
      二：安装插件包
        1，cnpm i element-ui -S
          配置：参考 main.js
        2，cnpm install axios -S
          配置：参考 main.js
        3，css自动添加兼容后缀配置
          cnpm install autoprefixer postcss postcss-loader -D
          配置：
          1）修改/build/vue-loader.conf.js文件
          module.exports = {
            loaders之下添加
            postcss: [require('autoprefixer')({
              browsers: [
                'last 10 Chrome versions',
                'last 5 Firefox versions',
                'Safari >= 6', 'ie > 8'
              ]
            })],
          }
          2）修改/build/utils.js文件
            定位到
              postcss: generateLoaders()
            修改为
              postcss: generateLoaders(['css?-autoprefixer'])
        4，cnpm install vuex --save
          配置：
            1）src 目录下创建文件夹vuex目录和相关文件（参考src/vuex）
            2）main.js引入
            import '@/vuex/index.js'
      三：权限控制

        权限表定义
        表名：t_authority
        id          (自增id)
        user_id     (用户id)
        page_name   (画面名称)
        permission  (数据级许可证，格式："['edit', 'delete']"，后台返回数据时转为数组)
        (del_flg, create_user, create_time, update_user, update_time, update_count)

        权限控制两种级别，1)页面级访问权限控制，2)数据级操作权限控制
        本框架处理方案：
          登录时，初始化
          1，生成左侧菜单，过滤掉无权限菜单
          2，获取该用户所有有权限画面授权集合，格式如下
            [{
              name: 'test',
              permission: ['edit', 'delete']
            }]
          3，以上信息存入sessionStorage
          4，main.js中定义（参考main.js）
            router.beforeEach((to, from, next) => {
              1）画面需要登录，但没有登录，直接进入登录画面
              2）画面不需要登录，直接进入该画面
              3）判断to画面有无授权，如无授权，则进入401画面
              4）在路由中设置授权信息（如无数据级操作权限，则无必要）
                // 获取画面授权
                let authority = User.getAuthority(to)
                // 把授权设置到路由meta中
                to.meta.authority = authority
              5）有画面授权，则进入该画面
            })
          5，数据级操作权限之画面控制（参考src/page/base/base.js，src/page/test.vue）
            1）新建文件：src/page/base/base.js
              在该文件中定义获取许可证的共通方法
            2）画面引入该文件
            3）添加混入：mixins: [base]
            4）在有权限控制的元素上添加
              v-if="!permission('edit')"
              说明：'edit'为定义的该操作的许可证
    </pre>
  </div>
</template>

<script>
export default {
  name: 'readme',
  props: {},
  components: {},
  data () {
    return {
      whiteList: ['www.google.com', 'www.google.com', 'www.google.com'],
      whiteUrl: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    getWhiteUrl (whiteList) {
      let sub = ''
      if (whiteList && whiteList.length !== 0) {
        sub = whiteList.join('\r\n')
      }
      return sub
    },
    getWhiteList (whiteUrl) {
      let sub = []
      if (whiteUrl && whiteUrl.trim().length !== 0) {
        sub = whiteUrl.split('\r\n')
        for (let i = sub.length - 1; i >= 0; i--) {
          if (!sub[i] || sub[i].trim().length === 0) {
            sub.splice(i, 1)
          }
        }
      }
      if (sub.length === 0) {
        return ''
      }
      return sub
    }
  }
}
</script>

<style scoped rel="stylesheet">
</style>
