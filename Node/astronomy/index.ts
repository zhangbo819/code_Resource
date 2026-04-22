import planets from "./planets";

// ts-node index.ts
// 测试数据
const data = planets.planetsHouses.getData(new Date(), 8);

// console.log("基础信息", data);
console.log(
  "上升点",
  data.angles.find((i) => i.name === "ASC"),
);
console.log(
  "月亮位置",
  data.planets.find((i) => i.name === "Moon"),
);

// const xiangwei = planets.phasePosition.calculateAspects([
//   ...data.planets,
//   data.angles.find((i) => i.name === "ASC"), // 只计算上升的相位
// ]);
// console.log("相位", xiangwei);
