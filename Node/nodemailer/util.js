const request = require("request")
const cheerio = require("cheerio")

const weatherURL = 'https://tianqi.moji.com/weather/china/beijing/haidian-district'

const greetingURL = 'http://wufazhuce.com/'

// 获取墨迹天气提示信息
function getWeatherTips(url) {
    const city = '北京市海淀区';
    return new Promise((resolve, reject) => {
        request(weatherURL, (error, res, body) => {
            if (!error) {
                let html = res.body || "";
                let $ = cheerio.load(html)
                let temp = $('.wea_weather em').text().trim() + '℃'
                let desc = $('.wea_weather b').text().trim()
                let water = $('.wea_about span').text().trim()
                let win = $('.wea_about em').text().trim()
                let tips = $('.wea_tips em').text().trim()
                let words = `今日天气 - ${city}\n${desc}\n温度：${temp}\n湿度：${water}\n风力：${win}\n${tips}`
                resolve(words)
            } else {
                reject(error)
            }
        })
    })
}


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