import axios from "axios";

window.axiosCancel = []  // 全局定义一个存放取消请求的标识
const Axios = axios.create({
  baseURL: "",
  timeout: 10000
});

//请求前拦截
Axios.interceptors.request.use(config => {
  // 添加取消标记
  config.cancelToken = new axios.CancelToken(cancel => {
    window.axiosCancel.push({ cancel })

    return config
  }, function (error) {
    return Promise.reject(error)
  })
});

//请求后返回数据拦截
Axios.interceptors.response.use(res => {
  
}, function axiosRetryInterceptor(res) {
  return Promise.reject(res)
});
export default Axios