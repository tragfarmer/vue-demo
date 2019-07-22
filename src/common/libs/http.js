/* eslint-disable space-before-function-paren */
/* eslint-disable no-trailing-spaces */
import axios from 'axios'
// import router from '@/router'
import User from './user.js'

/*
使用方法：
Fetch('/v2/movie/top250')
  .then((data) => {
    console.log(data)
  }).catch(err => {
    console.log('err:', err)
  })
*/

axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api'

const pending = {}
const CancelToken = axios.CancelToken
const handlePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('Cancel duplicate requests') // 取消重复请求
  }
  delete pending[key]
}
/**
 *  http request Interceptor
 */
axios.interceptors.request.use(
  config => {
    let d = config.params || config.data
    if (d && d.configCancelRepeat) {
      // 拦截重复请求（即当前正在进行的相同请求）
      let requestUrl = encodeURIComponent(config.url)
      handlePending(requestUrl, true)
      config.cancelToken = new CancelToken((c) => {
        pending[requestUrl] = c
      })
    }
    let contentType = null
    if (config.method === 'put') contentType = 'application/json;charset:utf-8;'
    else contentType = 'application/x-www-form-urlencoded'
    config.headers['Content-Type'] = contentType
    config.headers['token'] = User.getUser().token
    config.headers['name'] = User.getUser().username
    return config
  },
  err => {
    console.error(err)
    return Promise.reject(err)
  }
)

/**
 *  http response Interceptor
 */
axios.interceptors.response.use(
  response => {
    let d = response.config.params || response.config.data
    if (d && d.configCancelRepeat) {
      // 把已经完成的请求从 pending 中移除
      let requestUrl = encodeURIComponent(response.config.url)
      handlePending(requestUrl)
    }
    // if (response.data.errCode === 2) {
    //   // router.push({
    //   //   path: '/login',
    //   //   query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转
    //   // })
    // }
    return response
  },
  err => {
    if (axios.isCancel(err)) {
      console.warn('Request canceled', err.message)
    } else {
      console.error(err)
    }
    return Promise.reject(err)
  }
)
/**
 * 这个是可以自动取消重复请求的 get 请求
 * @param {*} url 
 * @param {*} params 非必须
 * @param {*} loading 非必须。请求完成会直接将loading置为false
 */
export function CRGet (url, params = {}, loading) {
  params.configCancelRepeat = true
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        if (loading) loading = false
        resolve(response.data)
      })
      .catch((error) => {
        if (loading) loading = false
        reject(error)
      })
  })
}

/**
 * get
 * @param {*} url 
 * @param {*} params 非必须
 * @param {*} loading 非必须。请求完成会直接将loading置为false
 */
export function Fetch (url, params = {}, loading) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        if (loading) loading = false
        resolve(response.data)
      })
      .catch((error) => {
        if (loading) loading = false
        reject(error)
      })
  })
}

/**
* @param {*} url 
 * @param {*} params 非必须
 * @param {*} loading 非必须。请求完成会直接将loading置为false
 */
export function Post (url, data = {}, loading) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (loading) loading = false
        resolve(response.data)
      })
      .catch((error) => {
        if (loading) loading = false
        reject(error)
      })
  })
}

/**
 * @param {*} url 
 * @param {*} params 非必须
 * @param {*} loading 非必须。请求完成会直接将loading置为false
 */
export function Patch (url, data = {}, loading) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        if (loading) loading = false
        resolve(response.data)
      })
      .catch((error) => {
        if (loading) loading = false
        reject(error)
      })
  })
}

/**
 * @param {*} url 
 * @param {*} params 非必须
 * @param {*} loading 非必须。请求完成会直接将loading置为false
 */
export function Put (url, data = {}, loading) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        if (loading) loading = false
        resolve(response.data)
      })
      .catch((error) => {
        if (loading) loading = false
        reject(error)
      })
  })
}
