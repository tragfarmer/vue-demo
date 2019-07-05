/* eslint-disable space-before-function-paren */
import axios from 'axios'
// import router from '@/router'
import User from './user.js'

/*
使用方法：
this.$fetch('/v2/movie/top250')
  .then((response) => {
    console.log(response)
  })
  .catch(err => {
    console.log('err:', err)
 })
*/

axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api'

/**
 *  http request Interceptor
 */
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data)
    // 'Content-Type': 'application/x-www-form-urlencoded'
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    // config.headers['Authorization'] = user.getUser().token
    config.headers['token'] = User.getUser().token
    config.headers['name'] = User.getUser().username
    return config
  },
  err => {
    console.error('request error', err)
    return Promise.reject(err)
  }
)

/**
 *  http response Interceptor
 */
axios.interceptors.response.use(
  response => {
    if (response.data.errCode === 2) {
      // router.push({
      //   path: '/login',
      //   query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转
      // })
    }
    return response
  },
  err => {
    console.error('response error', err)
    return Promise.reject(err)
  }
)

/**
 * get
 * @returns {Promise}
 */
export function Fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          console.error(err)
          reject(err)
        }
      )
  })
}

/**
 * @returns {Promise}
 */
export function Post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        console.error(err)
        reject(err)
      }
    )
  })
}

/**
 * @returns {Promise}
 */
export function Patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        console.error(err)
        reject(err)
      }
    )
  })
}

/**
 * @returns {Promise}
 */
export function Put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        console.error(err)
        reject(err)
      }
    )
  })
}
