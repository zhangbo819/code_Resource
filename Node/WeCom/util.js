const moment = require('moment')
const request = require('request')
const cheerio = require("cheerio")
const { getDailyGreeting } = require('../nodemailer/util')


const weatherURL = 'https://tianqi.moji.com/weather/china/beijing/haidian-district'

// 获取墨迹天气提示信息
function getWeatherTips(url) {
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
        // const words = `北京市-海淀区 ${desc}\n温度：${temp}℃\n空气指数: ${Air}\n风力：${win}\n湿度：${water}\n`

        resolve({
          tips,
          temp,
          desc,
          water,
          win,
          Air
        })
      } else {
        reject(error)
      }
    })
  })
}

// 获取今天
function getDatetime() {
  // console.log('moment().weekday()', moment().weekday());
  const week = {
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
    0: '星期日',
  };
  return moment().format('YYYY年MM月DD日 ') + week[moment().weekday()];
}

// 获取工资日
function getWageDay() {
  const wage = 10;
  // 获取日期 day
  // 如果在 wage号之前或等于wage时 那么就用 wage-day
  // 如果在 wage号之后 那么就用 wage +（当前月总天数-day）
  // 当日 日期day
  const day = moment().date();
  // 当月总天数
  const nowDayTotal = moment().daysInMonth();
  // // 下个月总天数
  // const nextDayTotal = moment().month(moment().month() + 1).daysInMonth();
  let resultDay = 0;
  if (day <= wage) {
    resultDay = wage - day;
  } else {
    resultDay = wage + (nowDayTotal - day);
  }
  return resultDay;
}

// 获取生日
function getbirthday() {
  const date = "-04-26";
  const birthday = moment().year() + date;
  // 获取当前时间戳
  const now = Date.now();
  // 获取今年生日 时间戳
  const nowTimeNumber = moment(birthday).valueOf();
  // 判断 生日 有没有过，如果已经过去（now>nowTimeNumber），resultBirthday日期为明年的生日 日期
  // 如果还没到，则 结束日期为今年的目标日期
  let resultBirthday = nowTimeNumber;
  if (now > nowTimeNumber) {
    // 获取明年目标日期
    resultBirthday = moment([(moment().year() + 1) + date]).valueOf();
  }
  return moment(moment(resultBirthday).format()).diff(
    moment(now).format(),
    "day"
  );
}

// 在一起的时间
function getDiffDate(targetDate = 1610553600000) {
  let date1 = new Date(targetDate);
  let date2 = new Date();
  date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const diff = date2.getTime() - date1.getTime();
  const diffDate = diff / (24 * 60 * 60 * 1000);
  return diffDate
}


module.exports = {
  getDatetime,
  getWeatherTips,
  getDailyGreeting,
  getDiffDate,
  getWageDay,
  getbirthday
}