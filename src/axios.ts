import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './defaults'
import { extend } from './helper/util'
import { AxiosStatic, AxiosRequestConfig } from './types'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context) // 因为均是使用了request的封装

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
export default axios
