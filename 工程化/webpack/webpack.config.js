const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 无用 css 的擦除
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const path = require("path");
const glob = require("glob");

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
  // mode: "production",
  entry: "./src/main",
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MyPlugin(),
    new SpeedMeasureWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        // 压缩HTML
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true, // 压缩内联css
      },
    }),
    new MiniCssExtractPlugin(),
    // 无用 css 的擦除
    new PurgeCSSPlugin({
      // 这里我的样式在根目录下的index.html里面使用，所以配置这个路径
      paths: glob.sync(`${path.join(__dirname)}/index.html`, { nodir: true }),
    }),
  ],
  optimization: {
    // 是否需要压缩
    minimize: true,
    // 配置压缩工具
    minimizer: [
      new TerserPlugin({}), // 添加 css 压缩配置
      new OptimizeCssAssetsWebpackPlugin({}),
    ], // 需要安装],
  },
};
