import { Body, Ecliptic, GeoVector } from "astronomy-engine";
import swisseph from "swisseph";

const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const BODIES = [
  Body.Sun,
  Body.Moon,
  Body.Mercury,
  Body.Venus,
  Body.Mars,
  Body.Jupiter,
  Body.Saturn,
  Body.Uranus,
  Body.Neptune,
  Body.Pluto,
];
enum FOUR_AXIS {
  ASC = "ASC",
  DSC = "DSC",
  MC = "MC",
  IC = "IC",
}

interface PlanetItem {
  house: number | undefined;
  sign: string;
  degree: number;
  name: Body | FOUR_AXIS;
  longitude: number;
}

type Houses = {
  ascendant: number;
  mc: number;
  houses: number[];
};

function getPlanetInfo(body: Body, date: Date) {
  const vec = GeoVector(body, date, true);
  const ecl = Ecliptic(vec);

  const lon = (ecl.elon + 360) % 360;

  return {
    name: body,
    longitude: lon,
    sign: SIGNS[Math.floor(lon / 30)],
    degree: +(lon % 30).toFixed(2),
  };
}

// 拿到10行星的经度 落座 度数
function getAllPlanets(date = new Date()) {
  return BODIES.map((body) => getPlanetInfo(body, date));
}

// 宫位
class PlanetsHouses {
  // 拿到宫位详情
  private getHouses(date: Date, lat: number, lon: number): Houses {
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

    if ("error" in result) {
      throw new Error(result.error);
    }

    return {
      ascendant: result.ascendant, // 上升点黄经
      mc: result.mc, // 天顶
      houses: result.house, // 12宫起点
    };
  }

  private _getHouseIndex(lon: number, houses: number[]) {
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

  private toUTC(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    tzOffset: number,
  ) {
    return new Date(Date.UTC(year, month, day, hour - tzOffset, minute));
  }

  private getAngles(houseData: Houses) {
    const asc = houseData.ascendant;
    const mc = houseData.mc;

    function _normalize(deg: number) {
      return (deg + 360) % 360;
    }

    return {
      [FOUR_AXIS.ASC]: asc,
      [FOUR_AXIS.DSC]: _normalize(asc + 180),
      [FOUR_AXIS.MC]: mc,
      [FOUR_AXIS.IC]: _normalize(mc + 180),
    };
  }

  private _formatPosition(lon: number) {
    return {
      longitude: lon,
      sign: SIGNS[Math.floor(lon / 30)],
      degree: +(lon % 30).toFixed(2),
    };
  }

  // 获取整体数据
  // tzOffset 当前时区 北京 8 日本 9
  public getData(date: Date, tzOffset = -new Date().getTimezoneOffset() / 60) {
    const dateUTC = this.toUTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      tzOffset,
    );

    // TODO 经纬度
    const Lat_Lon = {
      beijing: { lat: 35.68, lon: 116.4 }, // 北京
      shuangyashan: { lat: 46.64, lon: 131.15 }, // 双鸭山
      chiba: { lat: 35.623533, lon: 140.15712 }, // 千叶
    };

    const planets = getAllPlanets(dateUTC);
    const houseData = this.getHouses(
      dateUTC,
      Lat_Lon.chiba.lat,
      Lat_Lon.chiba.lon,
    );
    // console.log("houseData", houseData);

    const data: PlanetItem[] = planets.map((p) => ({
      ...p,
      house: this._getHouseIndex(p.longitude, houseData.houses),
    }));

    // 四轴
    const angles = this.getAngles(houseData);
    const formattedAngles: PlanetItem[] = Object.entries(angles).map(
      ([key, lon]) => {
        const { longitude, ...rest } = this._formatPosition(lon);

        return {
          name: key as FOUR_AXIS,
          longitude,
          ...rest,
          house: this._getHouseIndex(longitude, houseData.houses),
        };
      },
    );

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
  private getDynamicOrb(
    n1: PlanetItem["name"],
    n2: PlanetItem["name"],
    baseOrb: number,
  ) {
    if (n1 === Body.Sun || n2 === Body.Sun) return baseOrb + 2;
    if (n1 === Body.Moon || n2 === Body.Moon) return baseOrb + 2;
    return baseOrb;
  }
  private getAngleDiff(a: number, b: number) {
    const diff = Math.abs(a - b);
    return diff > 180 ? 360 - diff : diff;
  }
  private getAspect(
    n1: PlanetItem["name"],
    n2: PlanetItem["name"],
    diff: number,
  ) {
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
  public calculateAspects(planets: PlanetItem[]) {
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

export default {
  planetsHouses: new PlanetsHouses(),
  phasePosition: new PhasePosition(),
};
