import Vue from 'vue'
import VueX from 'vuex'
import vuexDemoStore from './modules/vuexDemo.js'
Vue.use(VueX)

const debug = process.env.NODE_ENV !== 'production'

export default new VueX.Store({
  debug,
  modules: {
    vuexDemo: vuexDemoStore
  }
})
