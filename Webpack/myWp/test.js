// const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
// const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

const entryFile = 'bundle.js'

const ast = parser.parse(fs.readFileSync(entryFile, "utf-8"), {
  sourceType: "module"
});

const { code } = transformFromAst(ast, null, {
  presets: ["@babel/preset-env"]
});
console.log(code)