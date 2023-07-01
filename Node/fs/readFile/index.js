var fs = require("fs");

const volumesPath = "./data.json";

function loadData() {
  const isExist = fs.existsSync(volumesPath);
  if (!isExist) {
    console.log("目录 " + volumesPath + " 不存在");
    return {};
  }
  const data = fs.readFileSync(volumesPath, { encoding: "utf8" }); // 写

  console.log('data', data)

//   fs.writeFileSync(volumesPath, JSON.stringify({d: 1})) // 读
  return data;
}

loadData();
