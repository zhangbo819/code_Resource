const fs = require("fs");
// 工具函数
const utils = require("./utils");

const targetYear = 2023;
const targetPart = "china";
// const targetPart = 'world'


const dataPath = `./${targetPart}/${targetYear}Data.json`;
const outputPath = `./${targetPart}/new${targetYear}Data.json`;

const EMPTY_PROVINCE = "TODO无省份";

// 生成 最简版 cityMap
// [{
//   name: '陕西省',
//   children: [
//     '西安市', '铜川市',
//   ]
// }...]
function genCityMap() {
  const {
    data,
    province,
    city,
    area,
    town,
  } = require("province-city-china/data");

  // console.log('data, province, city, area, town', data, province, city, area, town)
  // console.log(province);
  // console.log(city) // 地级市
  // console.log(area) // 直辖市的区、县级市、县

  const res = [];
  const provinceMap = {};
  province.forEach(({ name, province }) => {
    // res.push({ name, province })
    provinceMap[province] = { name, children: [] };
  });

  // 地级市
  city.forEach((item) => {
    provinceMap[item.province].children.push(item.name);
  });

  // 县级市
  area.forEach((item) => {
    if (item.name.includes("市")) {
      provinceMap[item.province].children.push(item.name);
    }
  });

  for (let key in provinceMap) {
    const { name, children } = provinceMap[key];
    res.push({ name, children });
  }

  const s_city = res.filter((item) => item.children.length === 0);
  console.log("特殊市", s_city);

  fs.writeFileSync("./mid/cityMap.json", JSON.stringify(res, null, 4));
  // fs.writeFileSync('./cityMap.js', "export default " + JSON.stringify(res))
  return res;
}

// 恢复历史数据
function historyData() {
  const data = require(`./new${targetYear}data.json`);
  const res = data
    .reduce((r, item) => {
      if (item.children && item.children.length) {
        item.children.forEach((i) => {
          if (i.children && i.children.length) {
            i.children.forEach((j) => {
              r.push(j);
            });
          } else {
            r.push(i);
          }
        });
      } else {
        r.push(item);
      }
      return r;
    }, [])
    .sort((a, b) => a.index - b.index);

  fs.writeFileSync(`./old${targetYear}Data.json`, JSON.stringify(res, null, 4));
}

// 处理原 address 中不正常的部分
function genDataAddress(cityMap) {
  const data = require(dataPath);
  const { provinceList, countyLevelCity } = utils; // 省列表、常见的县级市
  console.log("provinceList", provinceList);
  const pilotFreeTradeZone = [];
  // const specials = [
  //   { name: "上海市", city: "浦东新区" },
  //   { name: "福建省", city: ['厦门', '福州', '平潭'] },
  //   { name: "安徽省", city: ['合肥', '芜湖', '蚌埠'] },
  //   { name: "广西省", city: ['南宁', '钦州港', '崇左'] },
  // ]; // 自由贸易试验区

  // 地级市
  const cityList = utils.getCityList();
  // console.log("cityList", cityList);

  // 1. 处理省
  data.forEach((item) => {
    if (!item.address) {
      item.address = "";
      console.log("没有 address", item);
      return;
    }
    // 多地址，如 香港铜锣湾勿地臣街1号时代广场二座31楼,上海市
    if (item.address.includes(",")) {
      console.log("多地址取了第一个 原地址 ", item.address);
      item.address = item.address.split(",")[0];
    }

    let [province, city] = utils.getProvinceCity(item.address);
    // let address;

    // 1. 看看是不是这种格式的，中国（上海）自由贸易试验区浦东大道1号
    if (!province) {
      const reg_res = /中国[（\()](\S+)[）\)]自由贸易试验区.+/g.exec(
        item.address
      );
      if (reg_res && reg_res[1]) {
        // 上海 -> 上海市, 安徽 -> 安徽省
        const provinceItem = provinceList.find((i) =>
          i.simplenName.includes(reg_res[1])
        );
        if (provinceItem) {
          province = provinceItem.name;
          // TODO 没有市的情况 为这些补充市
          // if (!city && specials.includes(province)) {
          // province = province;
          // }

          pilotFreeTradeZone.push(item.address);

          item.address = item.address.replace(
            /中国[\(（](\S+)[）\)]自由贸易试验区/g,
            province
          );
          // console.log('item.address', item.address)
        } else {
          console.log("province 是一个非省级单位，需要手动处理 ", item.address);
        }
      }
    }

    // 2. 再看看是不是 有省份但没写省，比如 安徽蚌埠市...
    if (!province) {
      const provinceItem = provinceList.find(
        (i) => item.address.startsWith(i.simplenName) // 只匹配开头是省的，省份在后面的忽略，有时会有街道名称带省的情况
      );
      // console.log('provinceItem', provinceItem)
      if (provinceItem) {
        province = provinceItem.name;
        item.address = item.address.replace(provinceItem.simplenName, province);
        // console.log('item.address', item.address)
      }
    }

    // 3. 根据市找省
    if (!province) {
      // 去所有地级市找

      let target;
      // 有市 直接用市找省
      if (city) {
        // 广州市越秀区东风中路448号成悦大厦
        target = cityList.find((i) => city.includes(i.simplenName));
      } else {
        // 无市 根据地址找
        target = cityList.find((i) => item.address.includes(i.simplenName));
      }

      if (target) {
        // 市
        city = target.name;
        // 省去省列表里找
        province = provinceList.find(
          (j) => j.province === target.province
        ).name;

        item.address = item.address.replace(
          target.simplenName,
          province + city
        );
      } else {
        // 看看在不在常见县级市列表里
        const target = countyLevelCity.find((i) =>
          item.address.startsWith(i.name)
        );
        if (target) {
          // console.log("target", target);
          city = target.city;
          province = target.province;
          item.address = item.address.replace(
            target.name,
            province + city + target.name
          );
          // console.log("item.address", item.address);
        } else {
          // TODO
          console.log("市不存在 无省且不在地级市 " + item.address);
        }
      }
    }

    // 4. 去掉开头的国家，只保留省份
    const reg_country = /中国|中华人民共和国/;
    if (reg_country.test(province)) {
      const newProvince = province.replace(reg_country, "");
      item.address = item.address.replace(province, newProvince);
      province = newProvince;
    }
  });
  // TODO
  // console.log('自由贸易试验区 ', pilotFreeTradeZone)

  // 2. 处理市
  data.forEach((item) => {
    let [province, city] = utils.getProvinceCity(item.address);
    // item.name==='广州汽车工业集团有限公司' && console.log('广州汽车工业集团有限公司 target', province, city)

    if (!city) {
      if (province) {
        // 没有市 但有省
        //   // 通过省找市
        //   const target = cityMap.find((c) => c.children.includes(province));
        //   // console.log('target', target)
        //   if (target) {
        //     city = province;
        //     province = target.name;
        //     item.address = province + item.address; // 补齐 address
        //     // console.log('  补齐 ' + province)
        //   } else {
        //   }
        // TODO 碰到这种情况一般是县级市，所以去 area 里再找一次
        // const areaTarget = area.find(a => a.name === province)
        // if (areaTarget) {
        //   // areaTarget.province
        //   city = province
        //   province = areaTarget.name
        //   item.address = province + city + item.address // 补齐 address
        // } else {
        //   // 这要是没有就真没有了，打日志手动处理吧
        // }
        let [, area] =
          item.address.match(/.+?((省|自治区|特别行政区)|市|区)/g) || [];
        if (!area) {
          // TODO 无区
          console.log("  市不存在 有省 无区 " + item.address);
        }
      } else {
        console.log("省市都不存在 " + item.address);
      }
    }

    // // 再次处理 去掉开头的国家，只保留省份
    // const reg_country = /中国|中华人民共和国/;
    // if (reg_country.test(province)) {
    //   // console.log('  province', province, item.address) // 中华人民共和国北京市
    //   const newProvince = province.replace(reg_country, "");
    //   item.address = item.address.replace(province, newProvince);
    // }
  });

  // 2023
  // data.forEach((item) => {
  //   item.revenue = item.revenue / 10000
  // })

  fs.writeFileSync("./mid/f.json", JSON.stringify(data, null, 4));

  return data;
}

// 按省市划分数据
function genNewData(data) {
  // 开始生成省市 Map
  const resMap = {};
  data.forEach((item) => {
    // console.log("item.address", item.address);

    // 直接拿省和市
    let [province, city] = utils.getProvinceCity(item.address);

    // 处理没有城市的情况
    if (!city) {
      // 是特殊市，用区当市
      let [, area] =
        item.address.match(/.+?((省|自治区|特别行政区)|市|区)/g) || [];
      city = area;
    }

    // 给一个名字，便于 debug 查找
    if (!province) {
      province = EMPTY_PROVINCE;
    }

    // 按省市级别保存
    if (!resMap[province]) {
      resMap[province] = { name: province, children: [] };
    }

    const citys = resMap[province].children.find((i) => i.name === city);
    if (!citys) {
      resMap[province].children.push({ name: city, children: [item] });
    } else {
      citys.children.push(item);
    }
  });
  // cdata 仅替换文字，不修改格式
  // fs.writeFileSync("./cdata.json", JSON.stringify(data, null, 4));

  // 最后修改格式，根据 resMap 生成最终数组类型数据
  let res = [];
  for (let key in resMap) {
    const provinceItem = resMap[key];
    const provinceChildren = provinceItem.children.map((cityItem) => {
      return {
        name: cityItem.name,
        count: cityItem.children.length,
        children: cityItem.children,
      };
    });
    res.push({
      name: provinceItem.name,
      count: provinceItem.children.reduce(
        (r, i) => (r += i.children.length),
        0
      ),
      children: provinceChildren.sort((a, b) => b.count - a.count), // 市降序排列
    });
  }
  // 省降序排列
  res = res.sort((a, b) => b.count - a.count);

  // fs.writeFileSync(outputPath, JSON.stringify(res, null, 4));
  fs.writeFileSync(outputPath, JSON.stringify(res));
}

function main() {
  // historyData()
  // return
  // const cityMap = genCityMap();
  const data = genDataAddress();
  genNewData(data);
}
main();
