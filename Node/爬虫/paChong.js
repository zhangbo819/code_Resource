const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

const url = 'http://www.360doc.com/content/21/1115/05/40338771_1004202706.shtml'
const filePath = './pachong.txt'

axios.get(url).then((res) => {
  // console.log("res", res);

  const $ = cheerio.load(res.data);

  const data = $('tbody').html();

  console.log(data);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

  return data;
});
