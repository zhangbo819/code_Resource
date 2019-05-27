# RN开发规范
    1. 目录结构规范
    2. 命名规范
    3. 页面开发规范
## 目录结构规范
    |-- ReactNative
        |-- index.js       //项目入口文件
        |-- node_modules   //引入的模块
        |-- package.json   //配置文件
        |-- sheet
        |   |-- audio      //音频目录
        |   |-- images     //图片目录
        |   |-- data.js    //数据文件
        |
        |--src
        |   |-- assets     //静态文件
        |   |-- base       //公共组件
        |   |-- pages      //模板文件
        |   |-- style      //样式文件
        |   |-- util       //公共方法
        |   |-- main.js    //源代码入口文件   

## 命名规范
### 1. 通用命名规则
    1. 命名统一用英文字母来开头，不能以汉字、数字和下划线来命名
    2. 图片的命名中间用下划线来连接。如：blank_area.png
    3. 类名使用首字母大写的驼峰命名。如：LogicCard
    4. 方法名，参数名，成员变量，局部变量：首字母小写的驼峰形式，比如localValue / getHttpMessage() / inputUserId
    5. 常量：全字符大写，下划线分割，使用明确的单词
### 2. sheet/audio命名
    1. 封面音频：start.mp3
    2. 逻辑音频：logic1.mp3, logic2.mp3
    3. 题干音频：stem.mp3
    4. 文字解释音频：explain1.mp3, explain2.mp3...
    5. 可拖拽文字或者点击按钮音频：result1.mp3, result2.mp3...
### 3. sheet/images命名
##### 文件夹命名
    1. 公用：    common
    2. 卡片：    card
    3. 封面：    start
    4. 学一学：  learn1, learn2...
    5. 练一练：  exam1, exam2...
    6. 剧情互动：logic1, logic2...
##### 图片命名
    1. 题干：  stem.png
    2. 进度条：process.png
    3. 封面的文字图片：txt.png
    4. 单卡片类：card1.png, card2.png...
    5. 多卡片类：card41.png, card42.png, card43.png...
    6. 拖拽和点击类按钮：a1.png, a2.png...
    7. 拖拽或者点击需要切换的图片：m1.png, m2.png, m3.png...
    8. 虚线框的图片：blank_area.png
    9. 拖拽完消失的虚线框：b1.png, b2.png...
    10. 静态图片：pic1.png, pic2.png, pic3.png...
    11. 解释文字：explain.png
    12. 底部的背景或者整个页面的背景图片：bg.png
    13. 逻辑选择的彩色和灰色卡片：card_color.png, card_gray.png

## 页面开发规范

### 1. 普通模板规范
    1. 进度条采用咱们这边统一的进度条，不用按照设计老师的一个一个的切图
    2. 由于iphoneX的底部控制条的原因，放置按钮不能太靠下，按钮距离底部至少50px;如果按钮很多实在放不下可以把错误选项放在下面
    3. 下方的按钮或者文字需要距离左边界至少205px
    4. 卡片统一大小 560*920
    5. 每次改动模板或者新增方法都要写好注释
    6. 进度条、音频按钮、下一步按钮、学一学和练一练图标都已经有了统一的尺寸，不需要按照设计图再写一遍
    7. 代码每次缩进4个空格，如果不想一直按空格，可以把编辑器的tab设置为4个空格
    
### 2. data.js规范
    1. data.js不要加逻辑代码，纯属于数据文件，类似于json文件
    2. data.js中不要加注释
    3. data.js中的坐标按照顺序：width、height、x、y
       如：{width:100, hight:200, x:100, y:200}
    4. 数组的[]如果有选项，需要折行
       如：  "target": [
                { "x": 60, "y": 278, "width": 426, "height": 278 }
            ],
    5. 同一级的上下行要对齐，不能有错位
    6. 建议data.js编写按照一定的顺序：
       从前往后依次是：
       -- id 
       -> type 
       -> bgcolor 
       -> audioBtn 
       -> stem 
       -> processBar 
       -> piclist 
       -> targetPic
       -> blankArea 
       -> blankNum 
       -> blankList 
       -> answer 
       -> groupNum
       -> optlist 
       -> btnNext 
       -> hasRank
      上面只是列出了比较常见的一些属性；
      其他属性可以参照以前的源代码顺序
    7. data.js按照知识点来划分，每一个知识点之间有一个空行
    8. data.js的id从1开始，然后依次1，2，3...