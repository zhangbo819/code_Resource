const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const { car, steel } = require("../mapData");
const { targetName } = require("./config");


const filePath = `./${targetName}Data.json`;
const outputPath = `./industry${targetName}Data.json`;

// 网络请求获取行业
async function fetchIndustry(data) {
  let count = 0;
  const maxCount = 500;
  //   const maxCount = 100;

  const all = Promise.allSettled(
    data
      .filter((item) => !item.industry) // 只请求没有行业的
      .map(async (item) => {
        // 增加了等待时间，防止同时的大批量请求
        count++;
        let notCount = count;
        if (count > maxCount) return Promise.resolve(item);
        await new Promise(
          (resolve) => setTimeout(resolve, count * (1000 + 819)) // 间隔 1819 秒请求一次
        );

        console.log("start fetch", item.name, notCount);
        return fetchData(item);
      })
  );

  function fetchData(item) {
    const ua =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
    return axios
      .get("https://www.fortunechina.com/search/f500beta/search.do", {
        params: {
          key: item.name,
          facetStr: "",
          facetAction: "",
          curPage: "1",
          sort: "0",
        },
        headers: {
          "user-agent": ua,
        },
      })
      .then((res) => {
        console.log("end fetch", item.name);

        const $ = cheerio.load(res.data);

        const industry = $(
          ".soresult-l > ul > li:nth-child(1) > div > span:nth-child(1)"
        ).text();

        const country = $(
          ".soresult-l > ul > li:nth-child(1) > div > span:nth-child(2)"
        ).text();

        item.industry = industry.replace("所在行业： ", "");
        if (!item.country) {
          // 处理国家
          let countryText = country.replace("总部地理位置： ", "");
          //  格式 布卢姆菲尔德, 美国
          const countryRes = countryText.split(", ");
          if (countryRes.length) {
            countryText = countryRes[countryRes.length - 1];
          }
          item.country = countryText;
        }
        console.log("item", item);
        return item;
      })
      .catch((err) => {
        console.log("err fetch", item.name, err);
        return err;
      });
  }

  return all.then((allRes) => {
    // console.log("allRes", allRes);
    console.log("all over");

    const res = { success: [], fail: [] };
    allRes.forEach(({ value, status }) => {
      if (status === "fulfilled" && value.industry) {
        res.success.push(value);
      } else {
        res.fail.push(value);
      }
    });
    console.log(`fetchData 找到了 ${res.success.length} 个`, res.success);
    // console.log(`未找到 ${res.fail.length} 个`, res.fail);
    // console.log(`未找到 ${res.fail.length} 个`);

    return allRes.map((i) => i.value);
  });
}

// 计算前后个数差值的类
class Counts {
  constructor(data) {
    this.data = data;

    this.last = 0;
    this.now = this._getCount();
    this._log("初始 有行业的个数");

    this.stepMap = [null, "缓存表", "网络", "名字匹配"];
    this.step = 0;
  }
  // 获取有行业的个数
  _getCount() {
    return this.data.reduce((r, i) => {
      if (i.industry) {
        r++;
      }
      return r;
    }, 0);
  }

  _log(prefix = "") {
    console.log(`${prefix} ${this.now} 个`);
  }

  go() {
    this.step++;

    this.last = this.now;
    this.now = this._getCount();

    const prefix = `通过第 ${this.step} 步 ${this.stepMap[this.step]} 找到`;
    console.log(`${prefix} ${this.now - this.last} 个`);

    if (this.step === this.stepMap.length - 1) {
      this._log("最终 有行业的个数");
    }
  }
}

// 处理行业
async function main() {
  // 有 outputPath 用 outputPath，没有再取 filePath
  const hasLastFile = await fs.existsSync(outputPath);
  const data = await JSON.parse(
    fs.readFileSync(hasLastFile ? outputPath : filePath, { encoding: "utf8" })
  );

  // 对比 count
  const counts = new Counts(data);

  //   // 1. 先在缓存表里找
  //   data.forEach((i) => {
  //     if (!i.industry) {
  //       //   // 先去常见公司表里找
  //       //   const target = mapData.find((j) => j.name === i.name);
  //       //   if (target) {
  //       //     i.industry = target.industry;
  //       //     return;
  //       //   }
  //       // 这里不提前处理了，因为格式不一致
  //       //   // 这两个名字里带基本就是，所以请求前先处理
  //       //   const names = ["银行", "保险", "钢铁"];
  //       //   const nameTarget = names.find((name) => i.name.includes(name));
  //       //   if (nameTarget) {
  //       //     i.industry = nameTarget;
  //       //     return;
  //       //   }
  //     }
  //   });
  counts.go();

  // 2. 没有的话 网络查找
  await fetchIndustry(data);
  counts.go();

  // 3. 还没有的话 根据名字
  const name_Map = { 石油: "炼油", 电信: "电信、通讯", 电话: "通讯" };
  const names = [
    "银行",
    "汽车",
    "保险",
    "钢铁",
    "石油",
    "天然气",
    "电信",
    "医药",
    "电话",
    "电力",
    "邮政",
    "烟草",
  ];
  data.forEach((i) => {
    if (!i.industry) {
      // 常见汽车企业
      const carTarget = car.find((j) => i.name.includes(j));
      if (carTarget) {
        i.industry = "汽车";
        return;
      }

      // 常见钢铁企业
      const steelTaget = steel.find((j) => i.name.includes(j));
      if (steelTaget) {
        i.industry = "钢铁";
        return;
      }

      // 网络也没找到的话 根据名字判断
      const nameTarget = names.find((name) => i.name.includes(name));

      if (nameTarget) {
        i.industry = name_Map[nameTarget] ? name_Map[nameTarget] : nameTarget;
        return;
      }
    }
  });
  counts.go();

  //   console.log("banks", banks);

//   fs.writeFileSync(outputPath, JSON.stringify(data, null, 4));
  fs.writeFileSync(outputPath, JSON.stringify(data));
}

main();
