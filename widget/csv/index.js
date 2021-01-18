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
            contactList.push({ empl_id, name, page, currenthref })
        } catch (err) {
        }
    })
    .on("end", function () {
        // 过滤数据 计算次数
        const res_arr = contactList.reduce((r, i) => {
            // console.log('contactList i', i)
            const target = r.find(item => item.empl_id === i.empl_id && item.currenthref === item.currenthref);
            if (target) {
                if (typeof target.count === 'undefined') {
                    target.count = 0
                }
                target.count = target.count + 1;
            } else {
                r.push(i)
            }
            return r
        }, []);


        // 转化为csv形式
        let csv_data = "empl_id,name,page,currenthref,访问次数";
        res_arr.forEach(({ empl_id, name, page, currenthref, count }) => {
            csv_data += '\n' + [empl_id, name, page, currenthref, count].join(',')
        })
        // console.log('csv_data', csv_data)

        // 写入csv
        const output_path = './input/埋点数据.csv';
        fs.writeFile(output_path, csv_data, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");

            // open打开
            const spawn = require('child_process').spawn;
            const cmd = spawn('open', [output_path]);
        });
    });