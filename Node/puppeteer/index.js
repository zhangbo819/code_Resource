// 你可以在浏览器中手动完成的大部分事情都可以使用Puppeteer完成!

// 这里有几个例子让你开始:
// 生成页面的屏幕截图和pdf文件。
// 抓取SPA(单页应用程序)并生成预呈现内容(例如:“ssr”(服务器端渲染))。
// 自动化表单提交、UI测试、键盘输入等。
// 创建一个最新的自动化测试环境。使用最新的JavaScript和浏览器特性直接在最新版本的Chrome中运行测试。
// 捕获站点的时间轴跟踪，以帮助诊断性能问题。
// 测试Chrome扩展。

// 截图
const puppeteer = require('puppeteer');

async function jietu() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
};
jietu()


// 更多用例 https://github.com/checkly/puppeteer-examples