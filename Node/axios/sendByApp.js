const axios = require('axios')

const corpid = 'wwae54290a69d43e83'

// 获取 access_token
function getAccessToken() {
  return axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
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
  axios.get("https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_follow_user_list?access_token=" + access_token)
    .then((res) => { console.log(res.data) })
}

// get_follow_user_list(access_token)

// 创建群聊1
function createChat1() {
  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/appchat/create?access_token=${access_token}&debug=1`, {
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

  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/externalcontact/add_msg_template?access_token=${access_token}`, {
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
  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/externalcontact/list?access_token=${access_token}&userid=${'ZhangBo'}`)
    .then(res => {
      console.log('res', res.data)
    })
}

// 通过应用发送消息
async function AppSend() {
  const data = await Promise.all([getWeatherTips(), getDailyGreeting()])

  const access_token = await getAccessToken()
  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${access_token}`, {
    "touser": "ZhangBo|Mo",
    // "toparty": "PartyID1|PartyID2",
    // "totag": "TagID1 | TagID2",
    "msgtype": "text",
    "agentid": 1000002,
    "text": {
      // "content": "你的快递已到，请携带工卡前往邮件中心领取。\n出发前可查看<a href=\"http://work.weixin.qq.com\">邮件中心视频实况</a>，聪明避开排队。"
      "content": `${data[0].tips}\n>${data[0].words}\n\n><font color="info">${data[1]}</font>`
    },
    // "safe": 0,
    // "enable_id_trans": 0,
    // "enable_duplicate_check": 0,
    // "duplicate_check_interval": 1800
  }).then((res) => {
    console.log(res.data)
  })
}

// getAccessToken()
// createChat1()
// createChat2()
// getExternalUserList()
AppSend()

// TODO 外部联系人