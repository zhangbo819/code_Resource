const { send } = require('./send')
const { getWeatherTips, getDailyGreeting } = require('./util')
// const fs = require('fs')

async function main() {
    const res = await Promise.all([getWeatherTips(), getDailyGreeting()])

    console.log('res', res)
    const [weather, one] = res
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>宝子好啊</title>
    </head>
    <body>
      <div>
        <pre>${weather}</pre>
        <i>每日一句：${one}</i>
      <div>
    </body>
    </html>`.trim()

    send({ html })
    // fs.writeFile('./test.html', html, function () { })
}

main()