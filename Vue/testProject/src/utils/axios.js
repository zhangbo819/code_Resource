import axios from "axios";
import store from "@/store";

var instance = axios.create({
  timeout: 30000,
  withCredentials: true,
  baseURL: '/api'
});

const CancelToken = axios.CancelToken;

function getFunName (url) {
  if (!url) return ''
  let str = url.split('/')
  str = Array.from(new Set(str))
  let index = str.length - 1
  let funName = str[index]
  return funName
}

// 请求拦截
instance.interceptors.request.use(
  req => {
    req.cancelToken = new CancelToken(cancel => {
      const funName = getFunName(req.url)
      console.log('req', req)
      store.dispatch("setCancel", { cancel, funName })
    });
    return req;
  },
  err => Promise.reject(err)
);

// 响应拦截
instance.interceptors.response.use(
  function (response) {
    const funName = getFunName(response.config.url)
    console.log('response', response)
    store.dispatch("response", funName);
    if (response.status === 200 && response.data.request_id) {
      if (response.data.code == 0) {
        return response.data;
      } else {
        let msg = response.data.msg
        Message.error({
          message: msg,
          duration: 3000,
          center: true,
          offset: 50,
          showClose: true
        });
        return Promise.reject(error);
      }
    }
    return response;
  }
)
export default instance