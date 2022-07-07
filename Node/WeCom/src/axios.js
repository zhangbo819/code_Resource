const axiosCommon = require('axios')

const axios = axiosCommon.create()

axios.defaults.baseURL = "https://qyapi.weixin.qq.com/cgi-bin"

// axios.interceptors.request.use((config) => { })

const corpid = 'wwae54290a69d43e83'


// 获取 access_token
function getAccessToken() {
  return axios.get('/gettoken', {
    params: {
      corpid,
      corpsecret: process.argv[2]
    }
  }).then(res => {
    console.log('res', res.data)
    const { access_token } = res.data
    return access_token
  })
}

// getAccessToken()


// 获取配置了客户联系功能的成员列表
function get_follow_user_list(access_token) {
  axios.get("/externalcontact/get_follow_user_list?access_token=" + access_token)
    .then((res) => { console.log(res.data) })
}

// get_follow_user_list(access_token)

// 创建群聊1
function createChat1() {
  axios.post(`/appchat/create?access_token=${access_token}&debug=1`, {
    "name": "api创建的群聊",
    // "owner": "ZhangBo",
    "userlist": ["Mo", "ZhangBo"],
  }).then(res => {
    console.log('res', res.data)
  })
}

// createChat1()

// 创建群聊2, 需有人在手机上再点一次，一天只能发一次
function createChat2() {
  axios.post(`/externalcontact/add_msg_template?access_token=${access_token}`, {
    "chat_type": "single",
    "external_userid": [
      "wmnbVhcgAA2i5d366HW5H6iyTUnjQ6cg",
      "wmnbVhcgAAQjeOJk0079ksuTPB6OoU5A"
    ],
    "text": {
      "content": "文本消息内容"
    },
  }).then(res => {
    console.log('res', res.data)
  })
}

// 获取外部联系人用户列表
function getExternalUserList() {
  axios.post(`/externalcontact/list?access_token=${access_token}&userid=${'ZhangBo'}`)
    .then(res => {
      console.log('res', res.data)
    })
}

// 通过应用发送消息
function AppMessageSend(access_token, params) {
  return axios.post(`/message/send?access_token=${access_token}`, params).then((res) => {
    // console.log(res.data)
    return res
  })
}

module.exports = {
  getAccessToken,
  AppMessageSend
}