// 发送邮件脚本
const nodemailer = require('nodemailer')
const pass = require('./pass')

const userEmail = '297234792@qq.com'

let transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnetion: true,
  auth: {
    user: userEmail,
    pass
  }
})

function send(html) {
  transporter.sendMail({
    from: userEmail,
    to: '3474893041@qq.com',
    // to: userEmail,
    subject: '宝子',
    text: 'lalala',
    html: `<div>
      <p>${html}</p>
      <p>${new Date().toLocaleString()}</p>
      <img src="https://img1.baidu.com/it/u=1937403995,4064282499&fm=26&fmt=auto">
    <div>`
  }).then(res => {
    console.log('res', res)
  }).catch(err => {
    console.log('err', err)
  })
}

send('hi 宝子')