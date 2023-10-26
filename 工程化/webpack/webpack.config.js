const webpack = require('webpack')
// html 处理
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 分析时间
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
// 压缩 js
const TerserPlugin = require("terser-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 抽离 css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩 css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 无用 css 的擦除
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const path = require("path");
const glob = require("glob");
// Gzip
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 需要安装

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

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  mode: "none",
  // mode: "production",
  entry: "./src/main",
  output: {
    clean: true,
  },
  devServer: {
    // static: './dist',
    open: true,
    port: '8088',
    hot: true,
    // hotOnly: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
        exclude: /node_modules/, //排除 node_modules 目录
      },
    ],
  },
  plugins: [
    new MyPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new SpeedMeasureWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        // 压缩 HTML
        removeComments: true, // 移除 HTM L中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true, // 压缩内联 css
      },
    }),
    new MiniCssExtractPlugin({
      // filename: "[name].css",
    }),
    // 无用 css 的擦除
    new PurgeCSSPlugin({
      // 这里我的样式在根目录下的index.html里面使用，所以配置这个路径
      // paths: glob.sync(`${path.join(__dirname)}/index.html`, { nodir: true }),
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    // new CompressionWebpackPlugin(), // 注释掉，让调试时生成文件少些
  ],
  optimization: {
    // Tree Shaking
    // usedExports: true,  // 生产模式自动生效，开发模式配了也不生效 todo: 开发模式如何生效
    // 是否需要压缩
    minimize: true,
    // 配置压缩工具
    minimizer: [
      new TerserPlugin({}), // 添加 css 压缩配置
      new OptimizeCssAssetsWebpackPlugin({}),
    ], // 需要安装],

    splitChunks: {
      chunks: "all", // 值有 `all`，`async` 和 `initial`
      minSize: 20 * 1024, // 生成 chunk 的最小体积（以 bytes 为单位）。
      minRemainingSize: 0,
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
      maxInitialRequests: 30, // 入口点的最大并行请求数。
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\/]node_modules[\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
