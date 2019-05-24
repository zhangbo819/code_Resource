#!/usr/bin/env node

var inquirer = require('inquirer');
var BottomBar = require('inquirer/lib/ui/bottom-bar');

let loader = ['/ Installing', '| Installing', '\\ Installing', '- Installing'];
let i = 4;

// loading start
const ui = new BottomBar({ bottomBar: loader[i % 4] });
const timer = setInterval(() => {
    ui.updateBottomBar(loader[i++ % 4]);
}, 100);

// loading end
// clearInterval(timer);
// ui.updateBottomBar('Installation done!\n');


// var spawn = require('child_process').spawn;

// var cmd = spawn(cmdify('npm'), ['-g', 'install', 'inquirer'], { stdio: 'pipe' });
// cmd.stdout.pipe(ui.log);
// cmd.on('close', () => {
//   ui.updateBottomBar('Installation done!\n');
//   process.exit();
// });