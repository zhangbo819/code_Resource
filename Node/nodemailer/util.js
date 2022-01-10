const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")

const weatherURL = 'https://tianqi.moji.com/weather/china/beijing/haidian-district'

const greetingURL = 'http://wufazhuce.com/'

// 获取墨迹天气提示信息
function getWeatherTips(url) {
    let weatherData

    try {
        weatherData = require('./weatherData')
    } catch (err) {
        console.log('no history')
    }
    console.log('weatherData', weatherData)

    return new Promise((resolve, reject) => {
        request(weatherURL, (error, res, body) => {
            if (!error) {
                const html = res.body || "";
                const $ = cheerio.load(html)
                const tips = $('.wea_tips em').text().trim()
                const temp = $('.wea_weather em').text().trim()
                const desc = $('.wea_weather b').text().trim()
                const water = $('.wea_about span').text().trim()
                const win = $('.wea_about em').text().trim()
                const Air = $('.wea_alert em').text().trim()
                const history = `(较昨日${temp > weatherData.temp ? '上升' : '下降'}${Math.abs(temp - weatherData.temp)}度)`
                const words = `北京市-海淀区 ${desc}\n温度：${temp}℃${history}\n空气指数: ${Air}\n风力：${win}\n湿度：${water}\n`

                // 保留至历史数据
                fs.writeFileSync('./weatherData.js', 'module.exports = ' + JSON.stringify({
                    temp,
                }))

                resolve({
                    tips: `早上好，今日天气提示：${tips}`,
                    words
                })
            } else {
                reject(error)
            }
        })
    })
}

// 测试
// getWeatherTips().then(res => console.log(res))

// 获取wufazhuce.com每日一句
function getDailyGreeting() {
    return new Promise((resolve, reject) => {
        request(greetingURL, (error, res, body) => {
            let everyDayWordsList = [];
            if (!error && res.statusCode == 200) {
                let $ = cheerio.load(res.body.toString())
                $('div .fp-one-cita a').each(function (item) {
                    if ($(this).text()) {
                        everyDayWordsList.push($(this).text().trim())
                    }
                })
                let result = everyDayWordsList[0] || '网络错误，获取每日问候失败！'
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// 计算在一起的日子
function getDiffDate(targetDate) {
    let date1 = new Date(targetDate);
    let date2 = new Date();
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = date2.getTime() - date1.getTime();
    const diffDate = diff / (24 * 60 * 60 * 1000);
    return `宝贝，这是我们在一起的${diffDate}天`
}

module.exports = {
    getWeatherTips,
    getDailyGreeting,
    getDiffDate
}