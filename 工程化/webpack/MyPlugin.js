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
    MyPlugin
}