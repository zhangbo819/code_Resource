const swisseph = require("swisseph");
const { getAllPlanets, SIGNS } = require("./planets");

// 宫位
class PlanetsHouses {
  getHouses(date, lat, lon) {
    // 转 Julian Day
    const jd = swisseph.swe_julday(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
      date.getUTCHours() + date.getUTCMinutes() / 60,
      swisseph.SE_GREG_CAL,
    );

    // Placidus 分宫
    const result = swisseph.swe_houses(
      jd,
      lat,
      lon,
      "P", // Placidus
    );

    return {
      ascendant: result.ascendant, // 上升点黄经
      mc: result.mc, // 天顶
      houses: result.house, // 12宫起点
    };
  }

  getHouseIndex(lon, houses) {
    for (let i = 0; i < 12; i++) {
      const start = houses[i];
      const end = houses[(i + 1) % 12];

      if (start < end) {
        if (lon >= start && lon < end) return i + 1;
      } else {
        // 跨360°
        if (lon >= start || lon < end) return i + 1;
      }
    }
  }

  toUTC(year, month, day, hour, minute, tzOffset) {
    return new Date(Date.UTC(year, month, day, hour - tzOffset, minute));
  }

  getAngles(houseData) {
    const asc = houseData.ascendant;
    const mc = houseData.mc;

    function _normalize(deg) {
      return (deg + 360) % 360;
    }

    return {
      ASC: asc,
      DSC: _normalize(asc + 180),
      MC: mc,
      IC: _normalize(mc + 180),
    };
  }

  _formatPosition(lon) {
    return {
      longitude: lon,
      sign: SIGNS[Math.floor(lon / 30)],
      degree: +(lon % 30).toFixed(2),
    };
  }

  // 获取整体数据
  // tzOffset 当前时区 北京 8 日本 9
  getData(date, tzOffset = -new Date().getTimezoneOffset() / 60) {
    const dateUTC = this.toUTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      tzOffset,
    );

    // TODO 经纬度
    // const lat = 35.68; // 北京纬度
    // const lon = 116.4; // 北京经度

    const lat = 46.64;
    const lon = 131.15;

    const planets = getAllPlanets(dateUTC);
    const houseData = this.getHouses(dateUTC, lat, lon);
    console.log("houseData", houseData);

    const data = planets.map((p) => ({
      ...p,
      house: this.getHouseIndex(p.longitude, houseData.houses),
    }));

    // 四轴
    const angles = this.getAngles(houseData);
    const formattedAngles = Object.entries(angles).map(([key, lon]) => ({
      name: key,
      ...this._formatPosition(lon),
    }));

    return {
      houseData,
      planets: data,
      angles: formattedAngles,
    };
  }
}

// 相位
class PhasePosition {
  ASPECTS = [
    { name: "Conjunction", angle: 0, orb: 8 },
    { name: "Sextile", angle: 60, orb: 4 },
    { name: "Square", angle: 90, orb: 6 },
    { name: "Trine", angle: 120, orb: 6 },
    { name: "Opposition", angle: 180, orb: 8 },
  ];
  getDynamicOrb(n1, n2, baseOrb) {
    if (n1 === "Sun" || n2 === "Sun") return baseOrb + 2;
    if (n1 === "Moon" || n2 === "Moon") return baseOrb + 2;
    return baseOrb;
  }
  getAngleDiff(a, b) {
    let diff = Math.abs(a - b);
    return diff > 180 ? 360 - diff : diff;
  }
  getAspect(n1, n2, diff) {
    for (const asp of this.ASPECTS) {
      const orb = this.getDynamicOrb(n1, n2, asp.orb);
      if (Math.abs(diff - asp.angle) <= orb) {
        return {
          type: asp.name,
          exact: diff,
          orb: +Math.abs(diff - asp.angle).toFixed(2),
        };
      }
    }
    return null;
  }
  calculateAspects(planets) {
    const aspects = [];

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const p1 = planets[i];
        const p2 = planets[j];

        const diff = this.getAngleDiff(p1.longitude, p2.longitude);
        const aspect = this.getAspect(p1.name, p2.name, diff);

        if (aspect) {
          aspects.push({
            between: [p1.name, p2.name],
            type: aspect.type,
            angle: diff.toFixed(2),
            orb: aspect.orb,
            strength: aspect.orb < 1 ? "strong" : "normal",
          });
        }
      }
    }

    // 按紧密度排序
    // aspects.sort((a, b) => a.orb - b.orb);

    return aspects;
  }
}

const planetsHouses = new PlanetsHouses();
const phasePosition = new PhasePosition();

module.exports = {
  planetsHouses,
  phasePosition,
};
