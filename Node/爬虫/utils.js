// 工具函数
const utils = {
  // 省列表 缓存一下
  provinceList: [],
  // 获取简称版本的省份列表
  getProvinceList() {
    const { province: provinceList } = require("province-city-china/data");
    return provinceList.map((item) => {
      let simplenName;
      const special = ["广西", "宁夏", "新疆"].find((i) =>
        item.name.includes(i)
      ); // 广西壮族自治区 TODO 正则怎么把 什么族自治区给去掉 ?
      if (special) {
        simplenName = special;
      } else {
        simplenName = item.name.replace(/省|自治区|市|特别行政区/g, "");
      }
      return {
        ...item,
        simplenName,
      };
    });
  },
  // 获取省
  getProvince(address) {
    if (/^(中国)|(中华人民共和国)/.test(address)) {
      address = address.replace(/^(中国)|(中华人民共和国)/, "");
    }
    let [province] = address.match(/.+?(省|自治区|特别行政区)/g) || [];
    if (!province) {
      // 没有去省列表里找
      const target = this.provinceList.find((i) =>
        address.startsWith(i.simplenName)
      );
      if (target) {
        province = target.name;
      }
    }
    return [province];
  },
  // 获取 [省, 市]
  getProvinceCity(address) {
    // 有这种情况，两个市 a省江阴市华士镇华西新市村民族路2号，所以分开取
    const [province] = this.getProvince(address);
    let cityAddress = address;
    if (province) {
      cityAddress = address.replace(province, "");
    }
    const [city] = cityAddress.match(/.+?(市)/g) || [];
    return [province, city];
  },

  // 获取简称版地级市列表
  getCityList() {
    let { city: cityList } = require("province-city-china/data");
    // console.log('cityList', cityList.filter(i => !i.name.includes('市')))

    return cityList.map((item) => {
      const simplenName = item.name.replace(/市|盟|自治州|地区/g, "");
      return {
        ...item,
        simplenName,
      };
    });
  },
  // 检查是否是邮箱
  checkEmail(url = "") {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g.test(
      url
    );
  },
  // 常见的县级市
  countyLevelCity: [
    {
      name: "浦东新区",
      province: "上海市",
      city: "",
    },
    {
      name: "江阴",
      province: "江苏省",
      city: "无锡市",
    },
    {
      name: "张家港",
      province: "江苏省",
      city: "苏州市",
    },
    {
      name: "杨舍镇塘市",
      province: "江苏省",
      city: "苏州市张家港市",
    },
    {
      name: "吴江",
      province: "江苏省",
      city: "苏州市",
    },
    {
      name: "启东",
      province: "江苏省",
      city: "南通市",
    },
    {
      name: "如皋",
      province: "江苏省",
      city: "南通市",
    },
    {
      name: "诸暨",
      province: "浙江省",
      city: "绍兴市",
    },
    {
      name: "寿光",
      province: "山东省",
      city: "潍坊市",
    },
    {
      name: "广饶",
      province: "山东省",
      city: "东营市",
    },
    {
      name: "武安",
      province: "河北省",
      city: "邯郸市",
    },
    {
      name: "济源",
      province: "河南省",
      city: "济源市(直辖)",
    },
    {
      name: "汝州",
      province: "河南省",
      city: "平顶山市",
    },
  ],
};
utils.provinceList = utils.getProvinceList();

module.exports = utils;
