import Axios from './core/Axios'
import { extend } from './helper/util'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context) // 因为均是使用了request的封装

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
