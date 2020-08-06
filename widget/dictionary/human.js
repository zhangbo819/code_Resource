const { getRandom } = require('./utils')

const YEARS_TIME = 1000 * 3600 * 24 * 365;

class human {
  constructor() {
    this.life = this._getLife()
  }

  _getLife() {
    const max = 85 + getRandom(-15, 15);
    // const birthDay = new Date(getRandom(0, getRandom(0, Date.now() - max * YEARS_TIME)))
    // const age = Math.floor((Date.now() - birthDay.getTime()) / YEARS_TIME);
    const age = getRandom(0, max)
    const remaining = max - age;
    const birthDay = new Date(Date.now() - (age * YEARS_TIME))
    return {
      max,
      remaining,
      age,
      birthDay
    }
  }

  eat() {
    console.log('eat')
  }

  death() {
    console.log('death')
    this.life.lifeTime = 0
  }
}



module.exports = human
