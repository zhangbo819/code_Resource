const { AppMessageSend, getAccessToken } = require('./axios')
const { getWeatherTips, getDailyGreeting, getDiffDate } = require('./util')

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
      content: `${getDiffDate()}\n>${data[0].tips}\n>${data[0].words}\n\n><font color="info">${data[1]}</font>`,
      // "content": `您的会议室已经预定，稍后会同步到\`邮箱\` 
      // >**事项详情** 
      // >事　项：<font color=\"info\">开会</font> 
      // >组织者：@miglioguan 
      // >参与者：@miglioguan、@kunliu、@jamdeezhou、@kanexiong、@kisonwang 
      // > 
      // >会议室：<font color=\"info\">广州TIT 1楼 301</font> 
      // >日　期：<font color=\"warning\">2018年5月18日</font> 
      // >时　间：<font color=\"comment\">上午9:00-11:00</font> 
      // > 
      // >请准时参加会议。 
      // > 
      // >如需修改会议信息，请点击：[修改会议信息](https://work.weixin.qq.com)`
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