const csv = require('csv');
const fs = require('fs');

const targePath = './input/input.csv';

// let contactList = "empl_id,name,page,currenthref";
let contactList = [];
let parse = csv.parse;
let stream = fs.createReadStream(targePath)
    .pipe(parse({ delimiter: "," }));

stream
    .on("error", function (err) {
        return console.error(err.message);
    })
    .on("data", function (data) {
        try {
            const { empl_id, name, page, currenthref } = JSON.parse(data[16]).data;
            // contactList += '\n' + [empl_id, name, page, currenthref].join(',')
            // contactList.push([empl_id, name, page, currenthref].join(','))
            contactList.push({ empl_id, name, currenthref })
        } catch (err) {
        }
    })
    .on("end", end);


// 数据导入完成
function end() {
    // 根据id生成map数据，并计算次数
    const data_map = contactList.reduce((r, i) => {
        // console.log('contactList i', i)
        const { empl_id, currenthref } = i;

        if (typeof i.count === 'undefined') {
            i.count = 1
        }

        if (/^https?:\/\/scrm.100tal.com/.test(currenthref)) {
            // 正式环境
            const target = r[empl_id];
            // map对象里有
            if (target) {
                const page_item = r[empl_id].find(item => (item.currenthref === currenthref));
                // console.log('page_item', page_item)
                if (page_item) {
                    page_item.count = page_item.count + 1;
                } else {
                    r[empl_id].push(i)
                }

            } else if (empl_id !== '') {
                // map对象里没有 第一次存入数据
                // 过滤掉没登录的
                if (typeof r[empl_id] === 'undefined') {
                    r[empl_id] = []
                }
                r[empl_id].push(i)
            }
        } else if (/^https?:\/\/scrm.chengjiukehu.com/.test(currenthref)) {
            // 测试环境
        } else if (/^https?:\/\/localhost/.test(currenthref)) {
            // 开发环境
        }
        return r
    }, {});

    // console.log(data_map[148158])
    // return

    // 根据data_map，转换成个人信息的数组
    const data_arr = [];
    for (let key in data_map) {
        const item = data_map[key];

        // console.log('item', item)
        // 设置初始值
        const init_data = { name: '', empl_id: '', 总访问次数: 0 };
        const r_proxy = new Proxy(init_data, {
            get(obj, key) {
                return typeof obj[key] === 'undefined' ? 0 : obj[key]
            }
        })

        // 生成每个人的数据
        const person_item = item.reduce((r, page, index) => {
            if (index === 0) {
                r.name = page.name
                r.empl_id = page.empl_id
            }

            // 总次数
            r.总访问次数 += page.count;

            // 页面计数
            set_page_count(page, r)

            return r
        }, r_proxy)

        data_arr.push(person_item)
    }

    // console.log('data_arr', data_arr)

    // return

    // 转化为csv形式
    let csv_data = "name,empl_id,总访问次数,自定义菜单,被关注回复,渠道二维码,智能推送,角色管理,角色管理_名单详情,人员管理,公众号编辑,创建渠道二维码,智能推送编辑页,服务工具箱_资料下载,服务工具箱_数据统计,服务工具箱_分享,服务工具箱_编辑,图文消息发送,消息审核管理,创建审核消息,公众号授权,公众号图文消息审核,公众号图文消息详情,高级群发_列表,高级群发_新建图文,高级群发_新建文本图片,任务宝_列表,任务宝_推广,任务宝_创建编辑,关键词回复,关键词回复_查看关键词,关键词回复_新建编辑规则"; // 表头

    data_arr.forEach((item) => {
        const p_item = new Proxy(item, {
            get(obj, key) {
                return obj[key] === 0 ? '' : obj[key]
            }
        })
        const { name, empl_id, 总访问次数,
            自定义菜单, 被关注回复, 渠道二维码, 智能推送,
            角色管理, 角色管理_名单详情, 人员管理, 公众号编辑, 创建渠道二维码, 智能推送编辑页,
            服务工具箱_资料下载, 服务工具箱_数据统计, 服务工具箱_分享, 服务工具箱_编辑,
            图文消息发送, 消息审核管理, 创建审核消息,
            公众号授权, 公众号图文消息审核, 公众号图文消息详情,
            高级群发_列表, 高级群发_新建图文, 高级群发_新建文本图片,
            任务宝_列表, 任务宝_推广, 任务宝_创建编辑,
            关键词回复, 关键词回复_查看关键词, 关键词回复_新建编辑规则
        } = p_item;
        csv_data += '\n' + [name, empl_id, 总访问次数,
            自定义菜单, 被关注回复, 渠道二维码, 智能推送,
            角色管理, 角色管理_名单详情, 人员管理, 公众号编辑, 创建渠道二维码, 智能推送编辑页,
            服务工具箱_资料下载, 服务工具箱_数据统计, 服务工具箱_分享, 服务工具箱_编辑,
            图文消息发送, 消息审核管理, 创建审核消息,
            公众号授权, 公众号图文消息审核, 公众号图文消息详情,
            高级群发_列表, 高级群发_新建图文, 高级群发_新建文本图片,
            任务宝_列表, 任务宝_推广, 任务宝_创建编辑,
            关键词回复, 关键词回复_查看关键词, 关键词回复_新建编辑规则
        ].join(',');
    })
    // for (let key in data_map) {
    //     const item = data_map[key];

    //     // 排序
    //     item.sort((a, b) => b.count - a.count)

    //     // 总次数
    //     all_count = item.reduce((r, i) => {
    //         r += i.count;
    //         return r
    //     }, 0);
    //     csv_data += '\n' + [item[0].empl_id, item[0].name, '累计', all_count].join(',')

    //     // 每条
    //     item.forEach(({ empl_id, name, currenthref, count }) => {
    //         // csv_data += '\n' + [empl_id, name, currenthref, count].join(',')
    //         csv_data += '\n' + ['', '', currenthref, count].join(',')
    //     })
    // }
    // console.log('csv_data', csv_data)

    // return
    // 写入csv
    const output_path = `./input/蜂鸟埋点数据${new Date().toLocaleString()}.csv`;
    fs.writeFile(output_path, csv_data, function (err) {
        // fs.writeFile(output_path, JSON.stringify(obj, null, 4), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");

        // open打开
        const spawn = require('child_process').spawn;
        // const cmd = spawn('open', [output_path]);
        const cmd = spawn('open', ['./input']);
    });
}

// 计算各个页面的次数
function set_page_count(page, r) {
    const { currenthref, count } = page;
    if (currenthref.includes("/interactive/customMenu")) {
        r.自定义菜单 += count;
    } else if (currenthref.includes("/interactive/followedReply")) {
        r.被关注回复 += count;
    } else if (currenthref.includes("/interactive/channelQrcode")) {
        r.渠道二维码 += count;
    } else if (currenthref.includes("/interactive/smartPush")) {
        r.智能推送 += count;
    } else if (currenthref.includes("/interactive/keyWord/findData")) {
        r.关键词回复_查看关键词 += count;
    } else if (currenthref.includes("/interactive/keyWord")) {
        r.关键词回复 += count;
    } else if (currenthref.includes("/keyWord/editKey")) {
        r.关键词回复_新建编辑规则 += count;
    } else if (currenthref.includes("/permission/rolesManage")) {
        r.角色管理 += count;
    } else if (currenthref.includes("/permission/rolesManage/roster")) {
        r.角色管理_名单详情 += count;
    } else if (currenthref.includes("/permission/peopleManage")) {
        r.人员管理 += count;
    } else if (currenthref.includes("/OfficialEditor")) {
        r.公众号编辑 += count;
    } else if (currenthref.includes("/CreateQrcode")) {
        r.创建渠道二维码 += count;
    } else if (currenthref.includes("/editSmart")) {
        r.智能推送编辑页 += count;
    } else if (currenthref.includes('/message/send/list')) {
        r.图文消息发送 += count;
    } else if (currenthref.includes('/message/check/list')) {
        r.消息审核管理 += count;
    } else if (currenthref.includes("/message/send/creatMsg")) {
        r.创建审核消息 += count;
    } else if (currenthref.includes("/authorization/index")) {
        r.公众号授权 += count;
    } else if (currenthref.includes("/m-approve")) {
        r.公众号图文消息审核 += count;
    } else if (currenthref.includes("/m-textContent")) {
        r.公众号图文消息详情 += count;
    } else if (currenthref.includes("/serviceTools/dataDown")) {
        r.服务工具箱_资料下载 += count;
    } else if (currenthref.includes("/serviceTools/dataStatistics")) {
        r.服务工具箱_数据统计 += count;
    } else if (currenthref.includes("/serviceTools/toolShare")) {
        r.服务工具箱_分享 += count;
    } else if (currenthref.includes("/serviceTools/addOrEdit")) {
        r.服务工具箱_编辑 += count;
    } else if (currenthref.includes("/groupMessage/index")) {
        r.高级群发_列表 += count;
    } else if (currenthref.includes("/groupMessage/mpnewsMsg")) {
        r.高级群发_新建图文 += count;
    } else if (currenthref.includes("/groupMessage/imageOrTextMsg")) {
        r.高级群发_新建文本图片 += count;
    } else if (currenthref.includes("/task/list/create")) {
        r.任务宝_创建编辑 += count;
    } else if (currenthref.includes("/task/list/promotion")) {
        r.任务宝_推广 += count;
    } else if (currenthref.includes("/task/list")) {
        r.任务宝_列表 += count;
    }
}