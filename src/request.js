import axios from "axios";
const service = axios.create({});
let pending = {}; // 展示对象
/**
 * @description 用于取消指定请求并清除对象中该属性。或者只清除该对象中的此属性
 * @param { * } config 请求对象体
 * @param { boolean } status 请求是否已经完成
 * @return { void }
 */
const removePending = (config, status) => {
  const { url, method } = config;
  const key = `${url}&{ method }`;
  if (pending.hasOwnProperty(key) && !status) pending[key]();
  delete pending[key];
};
// 请求拦截器：所有的请求在发起请求之初都会走这个
service.interceptors.request.use(
  async config => {
    const { url, method } = config;
    const key = `${url}&${method}`;
    // 先检查该请求是否存在pending对象中。如果存在则清除上次的请求
    pending.hasOwnProperty(key) && removePending(config, false);
    // 将本次请求添加到pending对象中
    config.cancelToken = new axios.CancelToken(f => {
      pending[key] = f;
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器：所有的请求在响应之后都会走这个
service.interceptors.response.use(
  response => {
    const { config } = response;
    removePending(config, false); // 请求成功删除pending对象中的该请求属性
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
// 最后将service对象抛出去就行
export default service;
