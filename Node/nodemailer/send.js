// 发送邮件脚本
const nodemailer = require('nodemailer')
// const pass = require('./pass')

const userEmail = '297234792@qq.com'

let transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnetion: true,
  auth: {
    user: userEmail,
    pass: process.argv[2]
  }
})

function send({ one, weather }) {
  transporter.sendMail({
    from: userEmail,
    to: ['3474893041@qq.com', userEmail],
    // to: [userEmail],
    subject: '早上好',
    text: '每日问侯',
    // <p>${new Date().toLocaleString()}</p>
    // <img src="https://img1.baidu.com/it/u=1937403995,4064282499&fm=26&fmt=auto">
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>宝子好啊</title>
    </head>
    <body>
      <div>
        <pre style="margin-top: 8px">${weather}</pre>
        <i>${one}</i>
      <div>
    </body>
    </html>`
  }).then(res => {
    console.log('res', res)
  }).catch(err => {
    console.log('err', err)
  })
}

// send('from github actions')

// console.log('process.argv', process.argv[2])

module.exports = {
  send
}