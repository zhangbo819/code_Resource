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

function send (html) {
  transporter.sendMail({
    from: userEmail,
    to: '3474893041@qq.com',
    subject: 'node脚本测试',
    text: 'text',
    html: `<div>${html}<div>`
  }).then(res => {
    console.log(res)
  })
}

send('小傻猪')