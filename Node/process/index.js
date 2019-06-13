var fs = require('fs');


// console.log(process)
// console.log(global);
var a = { ...global };
delete a.global;

let data = "var ObjectKeys_global = " + JSON.stringify(Object.keys(global), null, 4) + '\n\n';

Object.keys(global).forEach((item) => {
    if (item === "global") return;
    if (typeof global[item] === 'function') {
        console.log(item)
        data += `var ${item} = ${global[item]};\n\n`;
    } else {
        data += `var ${item} = ${JSON.stringify(global[item], null, 4)};\n\n`;
    }
})


fs.writeFile('console.js', data, (err, res) => {
    console.log(err, res)
})