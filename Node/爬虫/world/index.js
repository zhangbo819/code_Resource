const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const { targetName, targetYear } = require("./config");

const filePath = `./${targetName}Data.json`;
// const filePath = `./industry${targetName}Data.json`; // 经过增加行业脚本后的

const outputDir = "./output/";

// 查企业名单
async function getData() {
  const config = {
    2020: {
      url: "https://www.fortunechina.com/fortune500/c/2020-08/10/content_372148.htm",
      fetchData(res) {
        const $ = cheerio.load(res.data);
        let data = [];

        // fs.writeFileSync(`./test.html`, res.data);

        $("table > tbody > tr").each(function () {
          // console.log("this");
          $(this).each(function () {
            const index = $("td:nth-child(1)", this).text();
            const name = $("td:nth-child(2)", this)
              .text()
              .replace("（集团）", "集团");
            const revenue = $("td:nth-child(3)", this).text();
            const profit = $("td:nth-child(4)", this).text();
            const country = $("td:nth-child(5)", this).text();

            const res = {
              index,
              name,
              country,
              industry: "",
              EnglishName: "",
              revenue,
              profit,
            };

            const reg_res = /(.+?)（(.+)\)/g.exec(name);
            console.log("reg_res", reg_res);
            if (reg_res) {
              res.name = reg_res[1];
              res.EnglishName = reg_res[2];
            }
            //   console.log(td.text());
            data.push(res);
          });
        });

        // data = data.slice(2);
        return data;
      },
    },
    2021: {
      url: "http://www.coi.org.cn/article/y/gjdt/202108/20210803183988.shtml",
      fetchData(res) {
        const $ = cheerio.load(res.data);
        let data = [];

        //   console.log('$', $('li'))

        $("table > tbody tr").each(function () {
          // console.log("this", this);
          $(this).each(function () {
            const index = $("td:nth-child(1) p", this).text();
            const name = $("td:nth-child(2) p", this).text();
            const revenue = $("td:nth-child(3) p", this).text();
            const profit = $("td:nth-child(4) p", this).text();
            const country = $("td:nth-child(5) p", this).text();

            const res = {
              index,
              name,
              country,
              industry: "",
              EnglishName: "",
              revenue,
              profit,
            };

            const reg_res = /(.+?)（(.+)\)/g.exec(name);
            console.log("reg_res", reg_res);
            if (reg_res) {
              res.name = reg_res[1];
              res.EnglishName = reg_res[2];
            }
            //   console.log(td.text());
            data.push(res);
          });
        });

        data = data.slice(2);
        return data;
      },
    },
    2022: {
      url: "https://www.ahchanye.com/cyxt/20971.html",
      fetchData(res) {
        const $ = cheerio.load(res.data);
        let data = [];

        //   console.log('$', $('li'))

        $("table > tbody tr").each(function () {
          // console.log("this", this);
          $(this).each(function () {
            const index = $("td:nth-child(1)", this).text();
            const name = $("td:nth-child(2)", this).text();
            const revenue = $("td:nth-child(3)", this).text();
            const profit = $("td:nth-child(4)", this).text();
            const country = $("td:nth-child(5)", this).text();

            const res = {
              index,
              name,
              country,
              industry: "",
              EnglishName: "",
              revenue,
              profit,
            };

            const reg_res = /(.+?)（(.+)\)/g.exec(name);
            console.log("reg_res", reg_res);
            if (reg_res) {
              res.name = reg_res[1];
              res.EnglishName = reg_res[2];
            }
            //   console.log(td.text());
            data.push(res);
          });
        });

        data = data.slice(2);
        return data;
      },
    },
    2023: {
      // 取完整列表，但没利润率, 利润率可以从这里的 js 里取
      url: "http://www.caifuzhongwen.com/fortune500/paiming/global500/2023_%E4%B8%96%E7%95%8C500%E5%BC%BA.htm",
      // TODO  数据有错别字，利润率虽然有但不准
      // url: "https://finance.sina.cn/zt_d/fubusi?from=wap&wm=%2C%2Fchannel_2.htm%3Fch%3D2",

      fetchData(res) {
        const $ = cheerio.load(res.data);
        let data = [];

        $("table > tbody tr").each(function () {
          // console.log("this", this);
          $(this).each(function () {
            const index = $("td:nth-child(1) i", this).text();
            const name = ($("td:nth-child(2) a", this).html() || "")
              .replace(/\n/g, "")
              .replace("(集团）", "集团");
            const revenue = $("td:nth-child(3)", this).text();
            // const profit = $("td:nth-child(4)", this).text();
            // const country = $("td:nth-child(5)", this).text();

            const res = {
              index,
              name,
              country: "",
              industry: "",
              EnglishName: "",
              revenue,
              profit: "",
            };

            // 将 &amp; 转化为 &
            const reg_res = name.replace(/&amp;/g, "&").split("<br>");
            // const reg_res = /(.+?)\((.+)\)?/g.exec(name);
            console.log("reg_res", reg_res);
            // console.log("reg_res", reg_res);
            if (reg_res) {
              res.name = reg_res[0];
              res.EnglishName = reg_res[1];
            }
            //   console.log(td.text());
            data.push(res);
          });
        });

        data = data.slice(1);
        return data;
      },
    },
  };
  const { url, fetchData } = config[targetYear];

  const fsData = await fs.existsSync(filePath);

  if (fsData) {
    return await fs.readFileSync(filePath, { encoding: "utf8" });
  }

  return axios.get(url).then((res) => {
    // console.log("res", res);

    const data = fetchData(res);

    // console.log(data);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

    return data;
  });
}

// 根据源数据转成新的格式
function change(data) {
  // 1. 将名单按国家分类，同时按数量排序
  const newData = data
    .reduce((r, i) => {
      const target = r.find((j) => j.name === i.country);
      if (!target) {
        r.push({ name: i.country, count: 0, children: [i] });
      } else {
        target.children.push(i);
      }

      return r;
    }, [])
    .map((i) => ({ ...i, count: i.children.length }))
    .sort((a, b) => b.count - a.count);

  fs.writeFileSync(
    `${outputDir}country${targetName}Data.json`,
    JSON.stringify(newData, null, 4)
  );

  // 2. 国家版 精简版
  const simplenData = newData
    .map((i) => {
      i.children = i.children.map((j) => {
        // return `第${j.index}名 ${j.name}(${j.EnglishName}) ${j.industry}`;
        return `第${j.index}名 ${j.name} ${j.industry}`;
      });
      return i;
    })
    .reduce((r, i) => {
      r[`${i.name}(${i.count})个`] = i.children;
      return r;
    }, {});

  fs.writeFileSync(
    `${outputDir}${targetName}国家精简版.txt`,
    JSON.stringify(simplenData, null, 4)
  );

  // 3. 根据行业分类
  const industryArr = data
    .reduce((r, i) => {
      const target = r.find((j) => j.name === i.industry);
      if (target) {
        target.children.push(i);
      } else {
        r.push({ name: i.industry, count: 1, children: [i] });
      }
      return r;
    }, [])
    .map((i) => {
      i.count = i.children.length;
      return i;
    })
    .sort((a, b) => b.count - a.count);

  fs.writeFileSync(
    `${outputDir}${targetName}行业版.json`,
    JSON.stringify(industryArr, null, 4)
  );

  // 4. 行业分类 精简版
  const simplenIndustry = industryArr
    .map((i) => {
      i.children = i.children.map(
        (j) => `${j.country} ${j.name} 第${j.index}名`
      );
      return i;
    }, [])
    .reduce((r, i) => {
      r[`${i.name}(${i.count})个`] = i.children;
      return r;
    }, {});
  fs.writeFileSync(
    `${outputDir}${targetName}行业精简版.txt`,
    JSON.stringify(simplenIndustry, null, 4)
  );
}

// 查询世界500强企业名单
async function genData() {
  // 1. 生成源数据
  let data = await getData();
  // data = JSON.parse(data);

  // 2. 对源数据进行转化
  // change(data);
}

genData();
