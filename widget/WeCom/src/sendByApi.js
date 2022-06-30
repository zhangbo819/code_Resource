const { AppMessageSend, getAccessToken } = require('./axios')
const { getWeatherTips, getDailyGreeting, getDiffDate } = require('../../../Node/nodemailer/util')

// 脚本应用发送消息
async function AppSend(type = 'markdown') {
  const data = await Promise.all([getWeatherTips(), getDailyGreeting()])
  const access_token = await getAccessToken()
  const params = {
    touser: "ZhangBo|Mo",
    // "touser": "ZhangBo",
    // "toparty": "PartyID1|PartyID2",
    // "totag": "TagID1 | TagID2",
    agentid: 1000002, // 应用 id
    msgtype: type,
    // "safe": 0,
    // "enable_id_trans": 0,
    // "enable_duplicate_check": 0,
    // "duplicate_check_interval": 1800
  }

  if (type === 'text') {
    params.text = {
      content: `${getDiffDate()}\n\n${data[0].tips}\n${data[0].words}\n\n${data[1]}`
    }
  } else if (type === 'markdown') {
    params.markdown = {
      content: `${getDiffDate()}\n>${data.tips}\n>${data.words}\n\n><font color="info">${data[1]}</font>`
    }
  }

  AppMessageSend(access_token, params)
}

// getAccessToken()
// createChat1()
// createChat2()
// getExternalUserList()

AppSend()

// TODO to 外部联系人