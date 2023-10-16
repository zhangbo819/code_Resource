const fs = require("fs");

const { targetName } = require("./config");

const historyPath = `./historyMap.json`;

class Main {
  async getHistoryData() {
    const data = JSON.parse(
      await fs.readFileSync(historyPath, { encoding: "utf8" })
    );
    console.log("data", data);
    return data;
  }

  async setHistoryData(data) {
    return fs.writeFileSync(historyPath, JSON.stringify(data, null, 4));
  }

  // 根据目标数据保存到已缓存的历史数据中
  async updateMap() {
    // const filePath = `./${targetName}Data.json`;
    const filePath = `./industry${targetName}Data.json`; // 经过增加行业脚本后的

    const historyData = await this.getHistoryData();
    const targetData = JSON.parse(
      await fs.readFileSync(filePath, { encoding: "utf8" })
    );
    console.log("targetData", targetData);

    targetData.forEach((item) => {
      const target = historyData.find((j) => j.name === item.name);
      if (target) {
        // 行业
        if (!target.country && item.country) {
          target.country = item.country;
        }
        // 行业
        if (!target.industry && item.industry) {
          target.industry = item.industry;
        }
      } else {
        // 历史没有，则生成
        const { name, industry, country } = item;
        historyData.push({ name, country, industry });
      }
    });

    console.log("historyData", historyData);

    this.setHistoryData(historyData);
  }

  // 根据历史数据，更新目标文件
  async genMap() {
    const targetFilePath = `./${targetName}Data.json`;
    const targetData = JSON.parse(
      await fs.readFileSync(targetFilePath, { encoding: "utf8" })
    );

    const historyData = await this.getHistoryData();

    const reg_simplar = /(集团)?(有限公司|股份有限公司|控股有限公司|有限责任公司|总公司|公司|集团)$/

    targetData.forEach((item) => {
      const itemName = item.name.replace(reg_simplar, '')
      const target = historyData.find((j) => j.name.replace(reg_simplar, '') === itemName);
      if (target) {
        // 国家
        if (target.country && !item.country) {
          item.country = target.country;
        }
        // 行业
        if (target.industry && !item.industry) {
          item.industry = target.industry;
        }
        // 名称统一
        if (target.name !== item.name) {
          item.name = target.name
        }
      }
    });

    const emptys = targetData.filter((i) => !i.country || !i.industry)

    console.log(
      "targetData 不全的还有 ",
      emptys,
      emptys.length
    );

    fs.writeFileSync(targetFilePath, JSON.stringify(targetData, null, 4));
  }
}

const main = new Main();
// 1. 根据历史更新源数据
main.genMap();
// 2. 根据最新数据更新历史
// main.updateMap();
