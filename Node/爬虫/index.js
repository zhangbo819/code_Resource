const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const utils = require("./utils");

const targetYear = 2021;
const targetPart = "china";
// const targetPart = 'world'

const filePath = `./${targetPart}/${targetYear}Data.json`;

// 查企业名单
async function getData() {
  const config = {
    2021: {
      url: "https://finance.sina.cn/china/gncj/2021-09-25/detail-iktzscyx6201643.d.html?from=wap",
      fetchData(res) {
        const $ = cheerio.load(res.data);
        let data = [];

        //   console.log('$', $('li'))

        $(".tb01 tr").each(function () {
          // console.log("this", this);
          $(this).each(function () {
            const index = $("td:nth-child(1)", this).text();
            const name = $("td:nth-child(2)", this).text();
            const revenue = $("td:nth-child(3)", this).text();
            //   console.log(td.text());
            data.push({ index, name, revenue });
          });
        });

        data = data.slice(2);
        return data;
      },
    },
    2022: {
      url: "https://finance.sina.com.cn/china/2022-09-06/doc-imqmmtha6136208.shtml",
      fetchData(res) {
        const $ = cheerio.load(res.data);
        let data = [];

        //   console.log('$', $('li'))

        $(".tb01 tr").each(function () {
          // console.log("this", this);
          $(this).each(function () {
            const index = $("td:nth-child(1)", this).text();
            const name = $("td:nth-child(2)", this).text();
            const revenue = $("td:nth-child(3)", this).text();
            //   console.log(td.text());
            data.push({ index, name, revenue });
          });
        });

        data = data.slice(1);
        return data;
      },
    },
    2023: {
      url: "http://www.caifuzhongwen.com/fortune500/paiming/chinalist500/2023_%E4%B8%AD%E5%9B%BD%E4%B8%8A%E5%B8%82%E5%85%AC%E5%8F%B8500%E5%BC%BA.htm",
      fetchData(res) {
        // console.log("res", res);
        let data = [];

        const $ = cheerio.load(res.data);

        $("#ui-table2 > tbody").each(function () {
          // console.log('this', this)
          $("tr", this).each(function () {
            const index = $("td:nth-child(1) i", this).text();
            const name = $("td:nth-child(2)", this).text();
            let revenue = $("td:nth-child(3)", this).text();

            // revenue = revenue.replace(/,/g, "") * 100 * 10000;
            revenue = revenue.replace(/,/g, "");
            // console.log('index', index)
            //   console.log(td.text());
            data.push({ index, name, revenue });
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

    console.log(data);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

    return data;
  });
}

// 查企业地址
async function getAddress() {
  const data =
    JSON.parse(await fs.readFileSync(filePath, { encoding: "utf8" })) || [];

  console.log(`没有地址的 ${data.filter((i) => !i.address).length} 个`);
  let count = 0;
  // const maxCount = 500;
  const maxCount = 63;

  const all = Promise.allSettled(
    data
      .filter((item) => !item.address) // 只请求没有地址的
      .map(async (item) => {
        // 增加了等待时间，防止同时的大批量请求
        count++;
        let notCount = count;
        if (count > maxCount) return Promise.resolve(item);
        await new Promise((resolve) => setTimeout(resolve, count * 1500));

        console.log("start fetch", item.name, notCount);
        return fetchData(item);
      })
  );

  all.then((allRes) => {
    // console.log("allRes", allRes);
    console.log("all over");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    const res = { success: [], fail: [] };
    allRes.forEach(({ value, status }) => {
      if (status === "fulfilled" && value.address) {
        res.success.push(value);
      } else {
        res.fail.push(value);
      }
    });
    console.log(`本次找到了 ${res.success.length} 个`, res.success);
    // console.log(`未找到 ${res.fail.length} 个`, res.fail);
    console.log(`未找到 ${res.fail.length} 个`);
  });

  function fetchData(item) {
    const map = {
      qichacha: "qichacha",
      aiqicha: "aiqicha",
      tianyancha: "tianyancha",
    };
    const type = map.qichacha;
    // const type = map.aiqicha;
    // const type = map.tianyancha;
    const ua =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
    if (type === map.qichacha) {
      const cookie =
        "qcc_did=1750fff5-3eff-428b-bd34-1bad007768d9; UM_distinctid=1896761be567cd-0c4a2b90345c4a-1b525634-1aeaa0-1896761be57f24; QCCSESSID=fad31e8544b93ab7070cfbef52; CNZZDATA1254842228=234421576-1689655619-https%253A%252F%252Fwww.google.com%252F%7C1690712522; acw_tc=6f84222c16907138478368010e64d3e88892b791ae81af57e4b7e45bf8";
      return axios
        .get("https://www.qcc.com/web/search", {
          params: { key: item.name },
          headers: {
            cookie,
            "user-agent": ua,
          },
        })
        .then((res) => {
          console.log("end fetch", item.name);

          const $ = cheerio.load(res.data);
          const address = $(".app-ltable tr:nth-child(1) .max-address").text();

          item.address = address;
          console.log("item", item);
          return item;
        })
        .catch((err) => {
          console.log("err fetch", item.name, err);
          return err;
        });
    } else if (type === map.aiqicha) {
      const cookie =
        "BIDUPSID=5175113ABB072D372C501D83D98424C2; PSTM=1682566915; BAIDUID=5175113ABB072D37CBC3AEA03E292DCE:FG=1; delPer=0; ZFY=kRim373CauhJcOlmPZtTLpx7rBqkyi1sx2khJ0mVjzc:C; BAIDUID_BFESS=5175113ABB072D37CBC3AEA03E292DCE:FG=1; PSINO=1; BA_HECTOR=2h85a1agah8l848haka105261ic9t9u1p; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_PS_PSSID=36544_39106_38943_38882_39114_39040_38917_39088_26350_39132_39100_39044; BCLID=9423105065139993180; BCLID_BFESS=9423105065139993180;";

      return axios
        .get("https://aiqicha.baidu.com/s", {
          params: { q: item.name, t: 0 },
          headers: { Cookie: cookie },
        })
        .then((res) => {
          console.log("end fetch", item.name);

          fs.writeFileSync("aiqicha.html", res.data); // TODO 如何渲染 scirpt 中的内容

          const $ = cheerio.load(res.data, { xmlMode: true, xml: true });

          const address = $(
            // ".company-list .card:nth-child(1) .legal-txt"
            ".company-list .card:nth-child(1) div.props > span:nth-child(4) > span.legal-txt"
          ).text();
          console.log("address", address);

          item.address = address;
          console.log("item", item);
          return item;
        })
        .catch((err) => {
          console.log("err fetch", item.name, err);
          return err;
        });
    } else if (type === map.tianyancha) {
      const cookie =
        "jsid=SEO-GOOGLE-ALL-SY-000001; TYCID=e5287480254c11ee84fe3d8f3dbd7a3c; ssuid=9486980496; sajssdk_2015_cross_new_user=1; bannerFlag=true; _ga=GA1.2.598715336.1689672273; _gid=GA1.2.1682201472.1689672273; HWWAFSESID=6076c32595a4a2629a1; HWWAFSESTIME=1689672272322; csrfToken=EAyZ4ssT_rvtkIHqByghcME7; Hm_lvt_e92c8d65d92d534b0fc290df538b4758=1689672276; searchSessionId=1689672863.79254443; tyc-user-info={%22state%22:%220%22%2C%22vipManager%22:%220%22%2C%22mobile%22:%2213041123852%22}; tyc-user-info-save-time=1689673181964; auth_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzA0MTEyMzg1MiIsImlhdCI6MTY4OTY3MzE4MSwiZXhwIjoxNjkyMjY1MTgxfQ.69wsjr-Wzjc2GqqDjkhzx2Z01tCEg9UelzTvBrvfDuPqC9lx7Sye0OfdSwuOBnZCV_QyHlePCrVey0CmT22BHw; tyc-user-phone=%255B%252213041123852%2522%255D; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22294666646%22%2C%22first_id%22%3A%221896850c684183-026a43488d073be-1b525634-1764000-1896850c68510f1%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTg5Njg1MGM2ODQxODMtMDI2YTQzNDg4ZDA3M2JlLTFiNTI1NjM0LTE3NjQwMDAtMTg5Njg1MGM2ODUxMGYxIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiMjk0NjY2NjQ2In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22294666646%22%7D%2C%22%24device_id%22%3A%221896850c684183-026a43488d073be-1b525634-1764000-1896850c68510f1%22%7D; Hm_lpvt_e92c8d65d92d534b0fc290df538b4758=1689673184";
      const checkAddress = (address) => {
        return (
          !address.includes("登录查看") &&
          address !== "天眼风险" &&
          !utils.checkEmail(address)
        );
      };
      return axios
        .get(`https://www.tianyancha.com/search`, {
          params: { key: item.name },
          headers: {
            cookie,
            "user-agent": ua,
          },
        })
        .then((res) => {
          console.log("end fetch", item.name);
          const $ = cheerio.load(res.data);
          // console.log('res.data', res.data)
          // console.log("dd", $(".company-list"));
          // 几个 dom 里查找
          const doms = [
            "#page-container > div > div.index_search-main__4nIOp > section > main > div.index_search-list-wrap__wi3T0 > div.index_list-wrap___axcs > div:nth-child(1) > div > div.index_search-item__W7iG_ > div.index_search-item-center__Q2ai5 > div:nth-child(4) > div > span:nth-child(2)",
            "#page-container > div > div.index_search-main__4nIOp > section > main > div.index_search-list-wrap__wi3T0 > div.index_list-wrap___axcs > div:nth-child(1) > div > div.index_search-item__W7iG_ > div.index_search-item-center__Q2ai5 > div:nth-child(5) > div > span:nth-child(2)",
            "#page-container > div > div.index_search-main__4nIOp > section > main > div.index_search-list-wrap__wi3T0 > div.index_list-wrap___axcs > div:nth-child(1) > div > div.index_search-item__W7iG_ > div.index_search-item-center__Q2ai5 > div:nth-child(6) > div > span:nth-child(2)",
          ];
          let address = "";
          for (let i = 0; i < doms.length; i++) {
            const add = $(doms[i]).text();
            // console.log('add', add)
            if (add) {
              if (checkAddress(add)) {
                address = add;
                break;
              }
            }
          }
          // console.log('address', address)

          if (!address) {
            // 看看是不是香港的
            const tags = $(
              "#page-container > div > div.index_search-main__4nIOp > section > main > div.index_search-list-wrap__wi3T0 > div.index_list-wrap___axcs > div:nth-child(1) > div > div.index_search-item__W7iG_ > div.index_search-item-center__Q2ai5 > div.index_tag-list__wePh_"
            );
            // console.log("tags", tags);

            tags.each(function () {
              const tag = $("div", this).text();
              console.log("tag", tag);
              if (
                [
                  "曾用名港股(正常上市)",
                  "港股(正常上市)",
                  "曾用名港股(终止上市)",
                ].includes(tag)
              ) {
                address = "香港";
              }
            });
          }
          // console.log("address", address);

          if (address) {
            item.address = address;
          }
          console.log("item", item);
          return item;
        })
        .catch((err) => {
          console.log("err fetch", item.name, err);
          return err;
        });
    }
  }
}

// 查询前500企业及地址
async function genData() {
  await getData();
  getAddress();
}

genData();