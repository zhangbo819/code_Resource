const Astronomy = require("astronomy-engine");

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
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

function getPlanetInfo(body, date) {
  const vec = Astronomy.GeoVector(body, date, true);
  const ecl = Astronomy.Ecliptic(vec);

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

// const data = getAllPlanets(new Date("2026-04-22T12:00:00"));

// console.log(data);

module.exports = { getAllPlanets, SIGNS }