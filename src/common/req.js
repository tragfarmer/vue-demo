/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import { CRGet, Fetch, Post, Patch, Put } from '@/common/libs/http.js'

export default {
  login (params, loading) { return CRGet('/user/getUserMsg', params, loading) }
}
