const { send } = require('./send')
const { getWeatherTips, getDailyGreeting } = require('./util')

async function main() {
    const res = await Promise.all([getWeatherTips(), getDailyGreeting()])

    console.log('res', res)
    send({ weather: res[0], one: res[1] })
}

main()