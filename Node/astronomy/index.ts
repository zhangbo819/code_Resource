import { getAllPlanets, phasePosition } from "./planets";
import { planetsHouses } from "./houses";

// ts-node index.ts
// 测试数据

// 是否用宫位
const withoutHouse = true;

if (withoutHouse) {
  const data = getAllPlanets(new Date());
  console.log("基础信息", data);
  console.log(
    "月亮位置",
    data.find((i) => i.name === "Moon"),
  );
} else {
  const housesData = planetsHouses.getData(new Date());
  console.log("带宫位", housesData);
  // console.log(
  //   "上升点",
  //   housesData.angles.find((i) => i.name === "ASC"),
  // );
  console.log(
    "月亮位置",
    housesData.planets.find((i) => i.name === "Moon"),
  );
}
// const xiangwei = phasePosition.calculateAspects([
//   ...housesData.planets,
//   housesData.angles.find((i) => i.name === "ASC"), // 只计算上升的相位
// ]);
// console.log("相位", xiangwei);

