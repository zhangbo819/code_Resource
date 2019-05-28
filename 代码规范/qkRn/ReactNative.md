# ReactNative代码规范(src下开发规范)

## 内容目录

- src下开发规范
    - pages下的组件规范
        1. [import](#import)
        2. [生命周期](#生命周期)
        3. [Component与PureComponent](#Component与PureComponent)
        4. [自定义方法](#自定义方法)
        5. [render](#render)
        6. [组件规范](#组件规范)   
        7. [state/props](#state/props)
        8. [样式 StyleSheet.create](#样式)
        9. [模板](#模板)

### import

1. import出来的组件名建议使用大驼峰，与文件名、类名一致
	
    ```js
    // bad 
    import demoPgae from './DemoPage';

    // good
    import DemoPage from './DemoPage';
    ```
2. 常用写法
	
   ```js
    // default
    import React from 'react';

    // 单个
    import { View } from 'react-native';
    
    // 多个
    import {
        View,
        Platform,
        DeviceEventEmitter,
        Animated,
        TouchableWithoutFeedback,
        Image,
        Text,
        TouchableOpacity
    } from 'react-native';

    // 尽量不用as起别名，为了使同一个属性或方法在各个文件中保持一致
    import * as util from './util/util.js';
    import { STORAGE_KEY as key } from './config/storeKey';
   ```
3. 建议在import的结尾处添加；
	
    ```js
    // bad 
    import demoPgae from './DemoPage';import demoPgae from './DemoPage'

    // bad 
    import demoPgae from './DemoPage'
    import demoPgae from './DemoPage'

    // good
    import demoPgae from './DemoPage';
    import demoPgae from './DemoPage';
    ```
4. import顺序
	
   ```js
    // 先导react和react-native包里面的组件
    import React, { Component } from 'react';
    import {
        View,
        Image,
        Text,
    } from 'react-native';

    // 导入第三方组件库
    import Storage from 'react-native-storage';

    // 导入团队内部的组件库 工具类
    import ReactWeb from 'react-native-web';
    import * as util from './util/util.js';

    // 导入相对路径的文件
    import Start from './pages/start';           // 起始页
    import Logic from './pages/logic';           // 逻辑选择页
    import LogicCard from './pages/logic_card';  // 逻辑选择页

    // 公共的组件属性或者方法
    import { 
        loadStorage, 
        saveStorage, 
        isDev, 
        removeStorage, 
        isAndroid 
    } from './config/config';
    import { STORAGE_KEY } from './config/storeKey';
   ```

### 生命周期

#### 图示
<img src='./image/react_life_cycle.png' title='react_life_cycle' width="100%" />

#### 注意事项
1. 从上到下按照使用顺序排列，初始化 -> 挂载 -> 更新 -> 销毁
2. 在constructor中不能使用async await
3. 建议将网络请求、事件监听函数绑定放在componentDidMount中，加快加载速度
4. 在componentWillUnmount中销毁定时器，解绑事件监听函数，防止内存泄漏
5. 删除空的生命周期

```js
class Demo extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { str: "hello" };
    }

    componentWillMount() {
        alert("componentWillMount");
    }

    async componentDidMount() {
        this.timer = setTimeout(() => {});
        this.addReceiveCustomMsgListener(this.receive);
        const res = await fetchData({});
    }

    componentWillReceiveProps(nextProps) {
        alert("componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        alert("shouldComponentUpdate");
        return true;        // 记得要返回true
    }

    componentWillUpdate() {
        alert("componentWillUpdate");
    }

    componentDidUpdate() {
        alert("componentDidUpdate");
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.removeListener(this.receive);
    }
}
```
#### react v16.3 之后

从 v16.3 开始，React为了提升性能在底层架构引入了fiber，而引入了fiber后 原来的三个生命周期 API componentWillMount、componentWillUpdate、componentWillReceiveProps 有可能会被调用两次，所以他们被标记为不安全的，并会在未来的版本中被废弃，取而代之的是两个全新的生命周期:

```js
class Demo extends React.Component { 
    static getDerivedStateFromProps() {}
    getSnapshotBeforeUpdate() {}
}
```

[关于新生命周期方法的使用及React v16新特性详情链接](https://juejin.im/post/5ade9be2f265da0b8f622ddf)

### Component与PureComponent

```js
import React, { PureComponent, Component } from 'react';

export default class Main extends Component {}
export default class Main extends PureComponent {}
```

除了为你提供了一个具有浅比较的shouldComponentUpdate方法，PureComponent和Component基本上完全相同。当props或者state改变时，PureComponent将对props和state进行浅比较。另一方面，Component不会比较当前和下个状态的props和state。因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染。

```js
// bad
<CommentItem likeComment={() => this.likeComment(user.id)} />

// good
<CommentItem likeComment={this.likeComment} userID={user.id} />
```

[关于Component与PureComponent的详情链接](https://segmentfault.com/a/1190000014979065)


### 自定义方法
#### 命名
1. 函数命名，统一使用驼峰法，应该使用箭头函数

   ```js
    // bad
    export default class Demo extends PureComponent {
       renderexplain(item, index) {
            // ...
       }
       render() {
           return <View>
                {this.state.explain.map((item, index) => this.renderexplain(item, index))}
           </View>
       }
   }

   // good
   export default class Demo extends PureComponent {
       renderExplain = (item, index) => {
            // ...
       }
       render() {
           return <View>
                {this.state.explain.map(this.renderExplain)}
           </View>
       }
   }
   ```
   
2. 对于渲染组件型使用renderXXX()
	
    ```js
    // bad
    showXXX () {}

    // good
    renderXXX = () => {}

    ```
3. 对于用户事件类的使用handleXXX()

   ```js
    // bad
    clickXXX () {}

    // good
    handleXXX = () => {}
   ```
   
4. 对于获取某个数据，带有返回值的工具类的函数使用getXXX()
	
    ```js
    // bad
    calcXXX () {}

    // good
    getXXX = () => {}
   ```
   
#### 渲染列表
1. 推荐使用map来渲染列表
2. 推荐为每个子项添加唯一的key
3. 推荐不省略掉 {} 和 return
4. 使用结构定义变量并赋予默认值

```js
// bad
renderItem = ({ name = '' }, i) => <View key={i}><Text>{name}</Text></View>

// good
renderItem = ({ name = '', id }) => {
    return <View key={"item_" + id}>
        <Text>{name}</Text>
    </View>
}

// bad
renderList = () => {
    const { data } = this.state;
    const result = [];
    for (let i = 0, len = data.length; i < len; i++) {
        result.push(this.renderItem(data[i], i, data))
    }

    return <View style={styles.list}>
        {result}
    </View>
}

// good
renderList = () => {
    const { data } = this.state;
    return <View style={styles.list}>
        {data.map(this.renderItem)}
    </View>
}
```


### render

1. 每个react组件必须有render，render中必须有return
2. render中可以写逻辑return不同的组件
3. render中不要写带有可能会导致重新渲染的方法，如this.setState等
4. 将常用的值定义为变量或常量

```js
render() {
    const { nowData, nowType } = this.state;
    if (nowData === null) {
        return null;
    } 
    const COM = MAIN_COM_ROUTER[nowType];

    return (<View style={{ flex: 1 }}>

        {nowData.processBar && RENDER.renderProcess(nowData.processBar)}

        {this.renderDevNav()}

        <COM
            data={nowData}
            commonNav={this.commonNav}
        />

    </View>);

}
```


### 组件规范

#### 命名
1. 组件建议统一放在 src / component 文件夹下
2. 一个文件只写一个React组件，组件名与文件名（大驼峰）必须保持相同，见名知义。
    - 文件命名 
        
        src/pages/PersonPage.js

    - 文件组件规范
    	
        ```js
        export default class PersonPage extends Component{

        }
        ```
3. 模块命名 模块使用当前文件名一样的名称，但不推荐使用index.js作为入口文件，突出Page承担的概念以及对开发IDE的适用
	
   ```js
   // bad
   import DemoPage from './DemoPage/index';

   // good
   import DemoPage from './DemoPage/DemoPage';
   ```
   
4. 引用命名，React模块名使用帕斯卡（大驼峰）命名，实例使用小驼峰法命名

    ```js
    // bad
    const DemoComponent = <DemoComponent />

    // good 
    const demoComponent = <DemoComponent />

    ```

#### 属性
1. 使用驼峰法
2. 不应该将rn框架提供的表示成其他意义的属性
3. 如果属性值为true，可以直接省略

```js
<Component demoProps="属性值" />

// bad
<Component style="用来传递值" />

// bad
<Demo hidden={true} />

// good
<Demo hidden />
```

4. 对于组件，总是加上defaultProps

```js
const defaultProps = {
    title : 'defaultProps'
};

export default class Test extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{this.props.title}</Text>
            </View>
        );
    }
}

Test.defaultProps = defaultProps;
```

5. 遵循以下的JSX语法缩进/格式。

```js
// bad
<Demo props1=""
    props2="" />

// good 有多行属性，新建一行关闭标签
<Demo
    props1=""
    props2=""
/>

// 若能直接一行显示的，直接写成一行
<Demo props1="" />

```

6. 对于JSX属性值总是使用双引号（""）
   
```js
// bad
<Demo props='' />

// good
<Demo props="" />
```


7. 总是在标签关闭前加一个空格, 不要在JSX {} 括号内两边都加空格

```js
// good
<Demo />

// good 
<Demo style={baz} />
```

#### Refs
- 总是在Refs里使用回调函数

```js
// bad
<Demo ref="myRef" />

// good
<Demo ref={(ref) => { this.myRef=ref; }} />
```

#### 封装与分离
- 每个组件不应该 超过600行
- 每个方法不应该 超过40行


### state/props
1. 减少setState，减少render
2. 局部渲染可以将props传递到子组件中去渲染

#### state

1. 【强制】当页面组件不需要跟随动态值重新 render 从而更新界面的时候，不要把值动态存储在 state 里。
   
    正例:
    
    ```js
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
    
    ```js
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

2. 【推荐】组件内部的 state 尽量少，将其推到系统边缘处，方便统一管理，组件通过接收 props 更新视图。
3. 【推荐】当使用多个 state时，推荐使用解构，统一写在方法开头。

    正例：
    
    ```js
        const {
            text,
            visible
        } = this.stat
    ```

#### props
1. 【推荐】推荐使用 props 更新子组件试图，而不是 通过 ref 获得子组件实例操作子组件的方式。
2. 【强制】不需要改变的 props，要保持引用地址唯一。PropTypes 类型是　funcation，需要绑定 this，不需要传递额外的参数，强制使用箭头函数的方式，需要传参数的时候推荐使用 bind 方式，不需要更改的 style 强制使用 StyleSheet 来创建样式并进行引用。

    正例：
    
    ```js
    class Login extends PureComponent {

        onPress = () => {

        }

        render() {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}
                >
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
    
    ```js
    const {
        size,
        color
    } = this.props;
    ```


### 样式

1. 项目的通用样式写在项目通用样式类中
2. 模块通用样式写在模块通用样式类中
3. 文件通用样式写在文件底部的const styles中
4. 独有样式写在行style中
5. 推荐使用StyleSheet.create, 不推荐行内样式, 但在使用动画属性时可以使用行内样式

```js
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import STYLE from './STYLE';

export default class Test extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ flex:1 }}>{this.props.title}</Text>
                <Text style={styles.welcome}>{this.props.title}</Text>
                <Text style={STYLE.welcome}>{this.props.title}</Text>
            </View>
        );
    }
}
// bad
const styles = {
    container: {
        flex: 1,
    },
};

// good
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
```
   
### 模板

```js
 // 先导react和react-native包里面的组件
import React, { PureComponent } from 'react';
import {
    View,
    Image,
    Text,
} from 'react-native';

// 导入第三方组件库
import Storage from 'react-native-storage';

// 导入团队内部的组件库 工具类
import ReactWeb from 'react-native-web';

// 导入相对路径的组件
import Start from './pages/start';           // 起始页
import Logic from './pages/logic';           // 逻辑选择页
import LogicCard from './pages/logic_card';  // 逻辑选择页

// 公共的组件属性、方法、样式
import { 
    loadStorage, 
    saveStorage, 
    isDev, 
    removeStorage, 
    isAndroid 
} from './config/config';
import { STORAGE_KEY } from './config/storeKey';
import * as util from './util/util.js';
import STYLE from './STYLE';

// 定义的常量 变量
let name = 'name';
const defaultProps = {
    text: 'Hello World',
};

export default class DemoComponent extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            data: []
        };
        this.list = {};
    }

    // 生命周期方法
    async componentDidMount() {
        this.timer = setTimeout(() => {});
        this.addReceiveCustomMsgListener(this.receive);
        const res = await fetchData({});
    }

    async componentWillReceiveProps(nextProps) {
        // ...
    }
    
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.removeListener(this.receive);
    }

    // 自定义方法
    renderContent = ({ name, id }, index) => {
        name += 'name_';
        return (<View key={"content_" + id + index}>
            <TouchableOpacity
                onPress={this.handleLogin}
                style={STYLE.touch}
            >
                <Text style={styles.loginText}>{name}</Text>
            </TouchableOpacity>
        </View>);
    }

    handleLogin = () => {}

    render() {
        const { data = null } = this.state;
        if (data === null) {
            return null;
        } 
        return (
            <View style={styles.container}>

                <Start data={data} />

                <ReactWeb 
                    data={data}
                    style={styles.container}
                    show
                />

                {data.map(this.renderContent)}

            </View>
        );
    }
}

DemoComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
    container: {{
        flex: 1
    }},
    ...
});
```


<!-- **[⬆ 回到顶部](#ReactNative代码规范)** -->
**[⬅ 返回上层](./目录.md)**