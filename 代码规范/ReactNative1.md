# ReactNative 代码规范

## 内容目录
	
- ReactNative 代码规范
  - 一、编码规范
    - [(一) 命名风格](#(一)命名风格)
    - [(二) 常量定义](#(二)常量定义)
    - [(三) 变量定义](#(三)变量定义)
    - [(四) 对象定义](#(四)对象定义)
    - [(五) 数组定义](#(五)数组定义)
    - [(六) 字符串使用](#(六)字符串使用)
    - [(七) 解构赋值](#(七)解构赋值)
    - [(八) 函数定义及使用](#(八)函数定义及使用)
    - [(九) 比较运算符 &(九) 等号](#比较运算符)
    - [(十) 循环体](#(十)循环体)
    - [(十一) 类型转换](#(十一)类型转换)
    - [(十二) 代码格式](#(十二)代码格式)
    - [(十三) package.json(十三)](#package.json)
    - [(十三) 控制语句](#(十三)控制语句)
    - [(十四) 日志管理](#(十四)日志管理)
  - 二、页面编写规范
    - [(一) state](#(一)state)
    - [(二) props](#(二)props)
    - [(三) 监听器](#(三)监听器)
    - [(四) 无状态组件](#(四)无状态组件)
    - [(五) 高阶组件](#(五)高阶组件)


## 一、编码规范

### (一)命名风格

  1. 【强制】代码中的命名均不能以下划线或美元符号开始,也不能以下划线或美元符号结束。
      - 反例:  ```_name / _name / $name / name_ / name$ / name_```
  2. 【强制】代码中的命名严禁使用拼音与英文混合的方式,更不允许直接使用中文的方式。
      - 说明:正确的英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用。
      - 正例: alibaba / taobao / youku / hangzhou 等国际通用的名称,可视同英文。
      - 反例: DaZhePromotion [ 打折 ] / getPingfenByName() [ 评分 ] / let 某变量 = 3
  3. 【强制】类名使用 UpperCamelCase 风格，即首字母大写。
     - 正例:  LoginPage
  4. 【强制】方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格，必须遵从驼峰形式，即首字母小写。
       - 正例:  localValue / getHttpMessage() / inputUserId
  5. 【强制】常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长。
     - 正例: MAX_STOCK_COUNT
     - 反例: MAX_COUNT
  6. 【强制】文件夹命名统一小写；组件，或者类名，首字母全部大写，遵守驼峰命名法；图片名字不允许使用中文。
     - 正例: components // 存放一些组件

### (二) 常量定义

1. 【推荐】对所有常量，对象的引用，推荐使用 const，而不是 var 或者 let。
    
    说明：
    
    const声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。
2. 【强制】不允许任何魔法值 ( 即未经预先定义的常量 ) 直接出现在代码中。
    
    反例:

    ```javaScript
    if (nameKeyValue === 1) {
        // to do
    }
    ```
3. 【强制】不要使用一个常量类维护所有常量,按常量功能进行归类,分开维护。
    
    说明: 
    
    大而全的常量类,非得使用查找功能才能定位到修改的常量,不利于理解和维护。
    
    正例:
    
    标识字段相关常量放在 constant 目录下；系统配置相关常量放在类 configs 目录下。

### (三)变量定义
1. 【推荐】需要引用变量，建议使用 let 代替 var。
说明：注意 var，let 的作用域。
2. 【强制】所有变量先定义，后使用。
3. 【强制】所有变量声明时赋予一个默认值。
   
### (四)对象定义

1. 【推荐】使用字面量语法来创建对象。

    正例:
    ```javaScript
    let item = {};
    ```
    反例:
    ```javaScript
    let item = new Object();
    ```
2. 【强制】不要使用[保留字]作为函数名、属性名、变量名。使用同义词替换需要使用的保留字。

    正例:
    ```javaScript
    var superman = {
        klass:: 'alien',
        hidden: true
    };
    ```
    反例:
    ```javaScript
    var superman = {
        class: 'alien',
        private: true
    };
    ```

3. 【推荐】使用扩展运算符[...]复制对象。

    正例:
    ```javaScript
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 };
    ```

    反例:
    ```javaScript
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 });
    ```


4. 【推荐】单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
    说明：这样做是为了避免在版本控制工具上因为新增加属性，之前最后一个属性后需要添加逗号，从而在版本控制工具显示该行修改。

    正例:
    ```javaScript
    const a = { k1: v1, k2: v2 };
    const b = {
    k1: v1,
    k2: v2,
    };
    ```

    反例:
    ```javaScript
    const a = { k1: v1, k2: v2, };
    const b = {
    k1: v1,
    k2: v2
    };
    ```


5. 【推荐】对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。

    正例:
    ```javaScript
    // if reshape unavoidable
    const a = {};
    Object.assign(a, { x: 3 });

    // good
    const a = { x: null };
    a.x = 3;
    ```

    反例:
    ```javaScript
    const a = {};
    a.x = 3;
    ```

### (五)数组定义

1. 【推荐】使用直接量创建数组。

    正例:
    ```javaScript
    let items = [];
    ```
    反例:
    ```javaScript
    let items = new Array();
    ```


2. 【推荐】向数组增加元素时使用 Array#push 来替代直接赋值。

    正例:
    ```javaScript
    let someStack = [];
    someStack.push('abc');
    ```
    反例:
    ```javaScript
    let someStack = [];
    someStack[someStack.length] = 'abc'
    ```

3. 【推荐】使用扩展运算符[...]复制数组。

    正例:
    ```javaScript
    const itemsCopy = [...items];
    ```
    反例:
    ```javaScript
    const len = items.length;
    const itemsCopy = [];
    let i;
    for (i = 0; i < len; i++) {
        itemsCopy[i] = items[i];
    }
    ```

4. 【推荐】使用 Array.from 将类数组对象转换成数组。

    正例:
    ```javaScript
    let arrayLike = {  
        '0': 'a',  
        '1': 'b',  
        '2': 'c',  
        length: 3  
    }; 
    let args = Array.from(arguments); // ['a','b','c']
    ```
   
### (六)字符串使用

1. 【推荐】使用单引号 '' 包裹字符串。
    正例:
    ```javaScript
    let name = 'Bob Parr';
    ```
    反例:
    ```javaScript
    let name = "Bob Parr";
    ```
2. 【推荐】超过 100 个字符的字符串应该使用连接符写成多行。
    正例:
    ```javaScript
    let errorMessage = 'This is a super long error that was thrown
    because ' +
        'of Batman. When you stop to think about how Batman had anything
    to do ' +
        'with this, you would get nowhere fast.';
    ```
    反例:
    ```javaScript
    let errorMessage = 'This is a super long error that was thrown
    because of Batman. When you stop to think about how Batman 
    had anyt hing to do with this, you would get nowhere fast.';

    let errorMessage = 'This is a super long error that was thrown
    because \
    of Batman. When you stop to think about how Batman had anything to
    do \
    with this, you would get nowhere \
    fast.';
    ```
3. 【推荐】动态字符串使用反引号。
    正例:
    ```javaScript
    const a = 'foobar';
    const b = `foo${a}bar`;
    ```

### (七)解构赋值

1. 【推荐】使用数组成员对变量赋值时，优先使用解构赋值。
    正例:
    ```javaScript
    const arr = [1, 2, 3, 4];

    const [first, second] = arr;
    ```
    反例:
    ```javaScript
    const arr = [1, 2, 3, 4];

    const first = arr[0];
    const second = arr[1];
    ```
2. 【推荐】函数的参数如果是对象的成员，优先使用解构赋值。
    正例:
    ```javaScript
    // good
    function getFullName(obj) {
    const { firstName, lastName } = obj;
    }

    // best
    function getFullName({ firstName, lastName }) {
    }
    ```
    反例:
    ```javaScript
    function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
    }
    ```
3. 【推荐】如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
    正例:
    ```javaScript
    function processInput(input) {
    return { left, right, top, bottom };
    }

    const { left, right } = processInput(input);
    ```
    反例:
    ```javaScript
    function processInput(input) {
    return [left, right, top, bottom];
    }
    ```

### (八)函数定义及使用

1. 【强制】不要在一个非函数代码块(if、while 等)中声明一个函数,。
2. 【强制】不要把参数命名为 arguments，这将取代函数作用域内的arguments 对象。
    
    正例:

    ```javaScript
    nope(name, options, args) {
        // todo
    }
    ```
    反例:
    ```javaScript
    nope(name, options, arguments)) {
        // todo
    }
    ```

3. 【推荐】那些需要使用函数表达式的场合，尽量用箭头函数代替。
说明：这样更简洁，而且绑定了 this。
    
    正例:
    ```javaScript
    // good
    [1, 2, 3].map((x) => {
    return x * x;
    });

    // best
    [1, 2, 3].map(x => x * x);
    ```
    反例:
    ```javaScript
    [1, 2, 3].map(function (x) {
    return x * x;
    });
    ```

4. 【强制】箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。
5. 【推荐】简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
6. 【推荐】所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。

    正例:
    ```javaScript
    function divide(a, b, { option = false } = {}) {
    }
    ```
    反例:
    ```javaScript
    function divide(a, b, option = false ) {
    }
    ```
7. 【推荐】使用默认值语法设置函数参数的默认值。

    正例:
    ```javaScript
    function handleThings(opts = {}) {
    // ...
    }
    ```
    反例:
    ```javaScript
    function handleThings(opts) {
    opts = opts || {};
    }
    ```

### (九)比较运算符 & 等号

1. 【推荐】优先使用 === 和 !== 而不是 == 和 !=。
2. 【推荐】使用快捷方式，条件表达式例如 if 语句通过抽象方法 ToBoolean 强制计算它们的表达式并且总是遵守下面的规则:
    1 ) 对象 被计算为 true
    2 ) Undefined 被计算为 false
    3 ) Null 被计算为 false
    4 ) 布尔值 被计算为 布尔的值
    5 ) 数字 如果是 +0、-0 或 NaN 被计算为 false,否则为 true
    6 ) 字符串 如果是空字符串 '' 被计算为 false,否则为 true

    正例:
    ```javaScript
    if (collection.length) {
        // todo
    }

    if (name) {
        // todo
    }
    ```
    反例:
    ```javaScript
    if (name !== '') {
        // todo
    }

    if (collection.length > 0) {
        // todo
    }
    ```

### (十) 循环体
1. 【强制】循环体 for( in ) 的性能损失是 for( of ) 或者 for(;;) 的 10 倍，所以尽量使用 for( of ) ，如果需要 index 的才使用 for(;;) ，而不是 for( in )取出数组下标。
说明: Object 无法 .length ，所以不能改成相应的 for(;;) ，只能用 for( in ) 。
Array 是可以 .length 的，所以使用 for( of ) 或者 for(;;) 皆可。

### (十一)类型转换
1. 【强制】使用 parseInt 转换数字时带上类型转换的基数。

    正例:
    ```javaScript
    let inputValue = '4';
    let val = parseInt(inputValue, 10);
    ```

2. 【推荐】转成布尔型，推荐使用双取反。
    ```javaScript
    let age = 0;
    let hasAge = !!age;
    ```

### (十二)代码格式

1. 【强制】大括号的使用约定。如果是大括号内为空,则简洁地写成 {} 即可,不需要换行 ; 如果是非空代码块则:
    1. 左大括号前不换行。
    2. 左大括号后换行。
    3. 右大括号前换行。
    4. 右大括号后还有 else 等代码则不换行 ; 表示终止的右大括号后必须换行。
2. 【强制】 左小括号和字符之间不出现空格 ; 同样,右小括号和字符之间也不出现空格。详见
第 5 条下方正例提示。
    
    反例: 
    ```javaScript
    if (空格 a == b 空格)
    ```
3. 【强制】 if / for / while / switch / do 等保留字与括号之间都必须加空格。
4. 【强制】任何二目、三目运算符的左右两边都需要加一个空格。
说明:运算符包括赋值运算符=、逻辑运算符&&、加减乘除符号等。
5. 【强制】采用 4 个空格缩进,禁止使用 tab 字符。
    
    说明:如果使用 tab 缩进,必须设置 1 个 tab 为 4 个空格。
    
    正例: ( 涉及 1-5 点 )
    ```javaScript
    sayHello() {
        const say = 'hello';
        // 运算符的左右必须有一个空格
        const flag = 0;
        // 关键词 if 与括号之间必须有一个空格,括号内的 f 与左括号,0 与右括号不需要空格
        if (flag === 0) {
            console.log(say);
        }
        // 左大括号前加空格且不换行;左大括号后换行
        if (flag === 1) {
            console.log('world');
            // 右大括号前换行,右大括号后有 else,不用换行
        } else {
            console.log('ok');
        }
    }
    ```

6. 【强制】注释的双斜线与注释内容之间有且仅有一个空格。

    正例:
    ```javaScript
    // 这是示例注释,请注意在双斜线之后有一个空格
    let hello = 'Hello';
    ```

7. 【强制】单行字符数限制不超过 120 个,超出需要换行,换行时遵循如下原则:
    1. 第二行相对第一行缩进 4 个空格,从第三行开始,不再继续缩进,参考示例。
    2. 运算符与下文一起换行。
    3. 方法调用的点符号与下文一起换行。
    4. 方法调用时,多个参数,需要换行时,在逗号后进行。
    5. 在括号前不要换行,见反例。

    正例:

    ```javaScript
    const path = Path()
            .moveTo(0, -redius/2)
            .arc(0, redius, 1)
            .arc(0, -redius, 1)
            .close();
    ```

    反例:
    ```javaScript
    // 超过 120 个字符的情况下,不要在括号前换行
    const path = Path() .moveTo(0, -redius/2).arc(0, redius, 1)...arc
        (0, -redius, 1) .close();

    // 参数很多的方法调用可能超过 120 个字符,不要在逗号前换行
    method(args1, args2, args3, ...
        , argsX);
    ```

8. 【强制】方法参数在定义和传入时,多个参数逗号后边必须加空格。
    正例:下例中实参的" a "，后边必须要有一个空格。
    method("a", "b", "c");
9. 【推荐】不同逻辑、不同语义、不同业务的代码之间插入一个空行分隔开来以提升可读性。
    说明:没有必要插入多个空行进行隔开。

### (十三)package.json

1. 【强制】在使用 npm 或者 yarn 获取资源时，必须在命令末尾添加 --save。

    说明:
    
    使用此命令会把使用的第三方相关信息写入到 package.json，这样，其他成员在下载或者更新代码后使用 npm i(或 npm install)，就可以下载最新的 npm 库，若不加 --save，执行 npm i 的时候就不会下载，其他成员运行项目可能会报错，此时需要分析查看报错信息进行重新的 npm install xxx。
2. 【强制】使用 git 或者 svn 进行代码版本管理时，不要上传 node_module文件（进行忽略）。
    
    说明:

    使用 package.json 进行包管理，下载或更新代码后，只需要执行 npm i，当有修改 npm 包，建议进行版本管理，上传到私有的github仓库。使用私有地址时，使用如下命令：
    npm i "git+私有仓库地址" --save
3. 【强制】使用第三方或拉取新仓库时，第一步使用 npm i 。
    
    说明:

    1. 检查版本是否冲突
    2. 更新node_modules
4. 【推荐】在使用 npm 或者 yarn 获取资源时，推荐不在命令行后添加 -g。

    说明: 

    此命令可以让此资源包在根目录进行获取(全局安装)，不利于资源管理。
    【强制】每个项目必须配置一个 READMA.md 文件，内容包括测试，正式环境等相关配置文件以及注意事项。
5. 【推荐】安装 npm 包时，推荐 ~ 来标识版本号，在需要稳定版本的时候去掉 package.json 中的 ^ 或 ~ 符号。

    说明：

    ~ 和 ^ 的作用和区别: ~ 会匹配最近的小版本依赖包，比如 ~1.2.3会匹配所有 1.2.x 版本，但是不包括 1.3.0。
    ^ 会匹配最新的大版本依赖包，比如 ^ 会匹配所有 1.x.x的包，包括 1.3.0，但是不包括 2.0.0。那么该如何选择呢？当然你可以指定特定版本号，直接写 1.2.3，前面什么前缀都没有，这样固然没有问题，但是如果依赖包发布新版本修复了一些小 bug，那么需要手动修改 package.json 文件，~ 和 ^则可以解决这个问题。但是需要注意 ^ 版本更新可能比较大，会造成项目代码错误，旧版本可能和新版本存在部分代码不兼容。所以推荐使用 ~ 来标记版本号，这样可以保证项目不会出现大的问题，也能保证包中的小 bug 可以得到修复，但是要求稳定版本的时候去掉 ^ 或 ~ 符号。

### (十四) 控制语句

1. 【强制】在一个 switch 块内,每个 case 要么通过 break / return 等来终止,要么注释说明程序将继续执行到哪一个 case 为止 ; 在一个 switch 块内,都必须包含一个 default 语句并且放在最后,即使空代码。
2. 【强制】在 if / else / for / while / do 语句中必须使用大括号。即使只有一行代码,避免采用单行的编码方式:
if (condition) statements;
3. 【推荐】表达异常的分支时,少用 if-else 方式 ,这种方式可以改写成:
    
    正例:
    ```javaScript
        if (condition) {
            ...
            return obj;
        }   
        // 接着写 else 的业务逻辑代码;
    ```
    
    说明:

    如果非得使用 if()...else if()...else... 方式表达逻辑,【强制】避免后续代码维
    护困难,请勿超过 3 层。
    正例:超过 3 层的 if-else 的逻辑判断代码可以使用卫语句、策略模式、状态模式等来实现,
    其中卫语句示例如下:
    ```javaScript
    today() {
        if (this.isBusy()) {
            console.log('change time.');
            return;
        }
        if (this.isFree()) {
            console.log('go to travel.');
            return;
        }
        console.log('stay at home to learn Alibaba Java Coding Guidelines.');
        return;
    }
    ```

4. 【推荐】除常用方法(如 getXxx/isXxx )等外,不要在条件判断中执行其它复杂的语句,将复杂逻辑判断的结果赋值给一个有意义的布尔变量名,以提高可读性。

    说明:

    很多 if 语句内的逻辑相当复杂,阅读者需要分析条件表达式的最终结果,才能明确什么样的条件执行什么样的语句,那么,如果阅读者分析逻辑表达式错误呢?

    正例:
    ```javaScript
    // 伪代码如下
    const isUserExisted = (user != null && user.id >= 0)  && (...) || (...);
    if (isUserExisted) {
        ...
    }
    ```
    反例:
    ```javaScript
    if ((user != null && user.id >= 0)  && (...) || (...)) {
        ...
    }
    ```
5. 【推荐】避免采用取反逻辑运算符。
    
    说明: 
    
    取反逻辑不利于快速理解,并且取反逻辑写法必然存在对应的正向逻辑写法。
    
    正例:
    
    使用 if (x < 628) 来表达 x 小于 628。
    
    反例:
    
    使用 if (!(x >= 628)) 来表达 x 小于 628。


### (十五) 日志管理
1. 【推荐】代码中过多使用 console.log 会消耗性能，推荐去除不必要的日志输入代码。
2. 【强制】在入口文件添加一下代码。

    说明: 

    可以在发布时屏蔽掉所有的 console.* 调用。React Native 有一个全局变量 Dev 用来指示当前运行环境是否是开发环境。我们可以据此在正式环境中替换掉系统原先的 console 实现。
    ```javaScript
    if (!__DEV__) {
        global.console = {
            info: () => {},
            log: () => {},
            warn: () => {},
            error: () => {}
        };
    }
    ```
    这样打包发布时，所有的控制台语句就会被自动替换成空函数，而在调试时它们仍然会被正常调用。


## 二、页面编写规范

### (一)state

1. 【强制】当页面组件不需要跟随动态值重新 render 从而更新界面的时候，不要把值动态存储在 state 里。
   
    正例:
    ```javaScript
    constructor(props) {
        super(props);
        this.inputText = '';
    }

    onChangeText = (text) => {
        this.inputText = text;
    }

    render() {
        return (
            <View>
                <TextInput
                    onChangeText={this.onChangeText}
                />
            </View>
        );
    }
    ```
    反例:
    ```javaScript
    constructor(props) {
        super(props);
        this.state = ({
            inputText: ''
        })
    }

    onChangeText = (text) => {
        this.setState({
            inputText: text
        });
    }

    render() {
        return (
            <View>
                <TextInput
                    onChangeText={this.onChangeText}
                />
            </View>
        );
    }
    ```

1. 【推荐】组件内部的 state 尽量少，将其推到系统边缘处，方便统一管理，组件通过接收 props 更新视图。
2. 【推荐】当使用多个 state时，推荐使用解构，统一写在方法开头。

    正例：
    ```javaScript
        const {
            text,
            visible
        } = this.stat
    ```

### (二)props
1. 【推荐】推荐使用 props 更新子组件试图，而不是 通过 ref 获得子组件实例操作子组件的方式。
2. 【强制】不需要改变的 props，要保持引用地址唯一。PropTypes 类型是　funcation，需要绑定 this，不需要传递额外的参数，强制使用箭头函数的方式，需要传参数的时候推荐使用 bind 方式，不需要更改的 style 强制使用 StyleSheet 来创建样式并进行引用。

    正例：
    ```javaScript
    class Login extends PureComponent {

        onPress = () => {

        }

        render() {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}>
                    <Text style={styles.text}>
                        我要出租
                    </Text>
                </TouchableOpacity>
            );
        }
    }

    const styles = StyleSheet.create({
        button: {
            backgroundColor: 'rgba(24,190,188,1.0)',
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            color: 'white',
            fontSize: 16
        }
    });
    ```


3. 【推荐】当使用多个 props 时，推荐使用解构，统一写在方法开头。
    
    正例：
    ```javaScript
        const {
            size,
            color
        } = this.props;
    ```
### (三)监听器

1. 【强制】代码中使用监听器，必须在组件卸载的时候进行销毁或者卸载。
    
    正例：
    ```javaScript
    const listeners = {};
    class Text extends Component {
        receive = () => {
        }

        componentDidMount() {
            this.timer = setTimeout( () => {
            });
            this.addReceiveCustomMsgListener(this.receive);
        }
        
        addListener(cb) {
            listeners[cb] = DeviceEventEmitter.addListener(
                (message) => {
                    cb(message);
            });
        }

        removeListener(cb) {
            if (!listeners[cb]) {
                return;
            }
            listeners[cb].remove();
            listeners[cb] = null;
        }

        componentWillUnmount() {
            this.timer && clearTimeout(this.timer);
            this.removeListener(this.receive);
        }
    }
    ```
### (四)无状态组件
1. 【推荐】当不需要状态 state 的组件，推荐使用无状态组件。

    正例:
    ```javaScript
    const Title = (props) => (
        <Text>
        {props.title}
        </Text>
    )
    
    Title.propTypes = {title: PropTypes.string}
    Title.defaultProps = {title: 'stateless component'}
    ```
### (五)高阶组件

1. 【推荐】组件类有共享逻辑，推荐抽象成高阶组件(Hoc，Higher-order Component)。

    正例：
    ```javaScript
    const LoginPleaseMixin = (ComposedComponent, LoginPlease) => {

        return class extends PureComponent {
            render() {
                const {
                    user
                } = this.props;
                if (user.isLogin) {
                    return (
                        <ComposedComponent
                            {...this.props}
                        />
                    );
                } else {
                    return (
                        <LoginPlease
                            {...this.props}
                        />
                    );
                }
            }
        };
    };
    export default LoginPleaseMixin;
    ```

## 参考文献
[参考文献](https://www.jianshu.com/p/ac723fd826a4)