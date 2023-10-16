const fs = require("fs");

const { targetName, targetYear } = require("./config");

const filePath = `./${targetName}Data.json`;
const outputPath = `./industry${targetName}Data.json`;

async function main() {
  const data = await JSON.parse(
    fs.readFileSync(filePath, { encoding: "utf8" })
  );

  const aData = await JSON.parse(
    fs.readFileSync(outputPath, { encoding: "utf8" })
  );

  aData.forEach((item, index) => {
    data[index].profit = item.profit;
  });

  fs.writeFileSync(`./test.json`, JSON.stringify(data));
}

main();
