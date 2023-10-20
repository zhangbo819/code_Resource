const htmlWebpackPlugin = require("html-webpack-plugin");

class MyPlugin {
  apply(compiler) {
    console.log("MyPlugin 启动");

    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation一可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // console.log(name)
        // console.log(compilation.assets[name]. source())
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}

module.exports = {
  mode: "none",
  entry: "./src/main",
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MyPlugin(),
    new htmlWebpackPlugin({
      template: "./index.html",
      minify: {
        // 压缩HTML
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true, // 压缩内联css
      },
    }),
  ],
};
