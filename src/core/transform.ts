import { AxiosTransformer } from '../types/index'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers) // 新的data会作为下一次fn的输入 链式调用形式；
  })
  return data
}
