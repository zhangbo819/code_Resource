const csv = require('csv');
const fs = require('fs');

const targePath = './input/1734-1yzv7issFVUIFz0jFjlF.csv';

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
    // 根据id生成数据，并计算次数
    const data_map = contactList.reduce((r, i) => {
        // console.log('contactList i', i)
        const { empl_id, currenthref } = i;

        if (typeof i.count === 'undefined') {
            i.count = 1
        }

        const target = r[empl_id];
        if (target) {
            const page_item = r[empl_id].find(item => (item.currenthref === currenthref));
            // console.log('page_item', page_item)
            if (page_item) {
                page_item.count = page_item.count + 1;
            } else {
                r[empl_id].push(i)
            }
        } else if (empl_id !== '') {
            // 过滤掉没登录的
            if (typeof r[empl_id] === 'undefined') {
                r[empl_id] = []
            }
            r[empl_id].push(i)
        }
        return r
    }, {});

    // console.log(data_map)


    // 转化为csv形式
    let csv_data = "empl_id,name,currenthref,访问次数";
    for (let key in data_map) {
        const item = data_map[key];

        // 排序
        item.sort((a, b) => b.count - a.count)

        // 总次数
        all_count = item.reduce((r, i) => {
            r += i.count;
            return r
        }, 0);
        csv_data += '\n' + [item[0].empl_id, item[0].name, '累计', all_count].join(',')

        // 每条
        item.forEach(({ empl_id, name, currenthref, count }) => {
            // csv_data += '\n' + [empl_id, name, currenthref, count].join(',')
            csv_data += '\n' + ['', '', currenthref, count].join(',')
        })
    }
    // console.log('csv_data', csv_data)

    // return
    // 写入csv
    const output_path = './input/埋点数据.csv';
    fs.writeFile(output_path, csv_data, function (err) {
        // fs.writeFile(output_path, JSON.stringify(obj, null, 4), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");

        // open打开
        const spawn = require('child_process').spawn;
        const cmd = spawn('open', [output_path]);
    });
}