const axios = require('axios')
const { getWeatherTips, getDailyGreeting } = require('../nodemailer/util')


// console.log('axios', axios)

// webhook 发消息
function send(url, content) {
  // const text = {
  //   msgtype: 'text',
  //   text: {
  //     content: "1212",
  //     // "mentioned_list": ["@all"],
  //     // "mentioned_mobile_list": ["@all"]
  //   }
  // }
  const markdown = {
    msgtype: 'markdown',
    markdown: {
      // content: '您的会议室已经预定，稍后会同步到`邮箱` \n >**事项详情** \n>事　项：<font color="info">开会</font> \n>组织者：@miglioguan \n>参与者：@miglioguan、@kunliu、@jamdeezhou、@kanexiong、@kisonwang \n> \n>会议室：<font color="info">广州TIT 1楼 301</font> \n>日　期：<font color="warning">2018年5月18日</font> \n>时　间：<font color="comment">上午9:00-11:00</font> \n> \n>请准时参加会议。 \n> \n>如需修改会议信息，请点击：[修改会议信息](https://work.weixin.qq.com)'
      content,
      mentioned_list: ["@all"]
    }
  }
  axios.post(url, markdown).then(res => {
    // console.log('res', res.data)
  })
}


async function main () {
  const res = await Promise.all([getWeatherTips(), getDailyGreeting()])
  // console.log(res)

  send(process.argv[2], `${res[0].tips}\n>${res[0].words}\n\n><font color="info">${res[1]}</font>`)
}

main()