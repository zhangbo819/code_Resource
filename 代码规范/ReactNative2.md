# ReactNative项目实践编码规范

## 基本规范

1. 一个文件只写一个React组件，组件名与文件名必须[MUST]保持相同，见名知义。
    ```
    文件命名 
    -- PersonPage

    文件组件规范
    export default class PersonPage extends Component{

    }
    ```

2. 必须[MUST]使用ES6语法

## Mixins
不推荐使用[SHOULD NOT] mixins Mixins会增加隐式的依赖，导致命名冲突，并且会以滚雪球式增加复杂度。在大多数情况下Mixins可以被更好的方法替代，如：组件化，高阶组件，工具模块等。

## 命名

1. 包名，文件夹名小写，使用下划线进行分割。
2. 文件名使用帕斯卡命名，如DemoPage
3. 引用命名，React模块名使用帕斯卡命名，实例使用驼峰法命名

    ```javaScript
    //bad 
    import demoPgae from './DemoPage'

    //good
    import DemoPage from './DemoPage'

    //bad
    const DemoComponent=<DemoComponent/>

    //good 
    const demoComponent=<DemoComponent/>

    ```
4. 模块命名 模块使用当前文件名一样的名称，但不推荐使用index.js作为入口文件，突出Page承担的概念以及对开发IDE的适用
   ```javaScript
   import DemoPage from './DemoPage/DemoPage'
   ```

5. 函数命名，统一使用驼峰法，对于渲染组件型使用renderXXX(),应该[SHOUL]使用箭头函数
    ```javaScript
    renderXXX=()=>{}

    aaBB=()=>{}
    ```
6. 属性
使用驼峰法
不应该[SHOULD NOT]将rn框架提供的表示成其他意义的属性
如果属性值为true，可以直接省略
对于组件，总是加上defaultProps
    ```javaScript
    <Component demoProps="属性值">

    //bad
    <Component style="用来传递值">

    //bad
    <Demo hidden={true}>

    //good
    <Demo hidden>
    ```

## 对齐

遵循以下的JSX语法缩进/格式。

    ```javaScript
    //bad
    <Demo props1=""
          props2=""/>

    //good 有多行属性，新建一行关闭标签
    <Demo
        props1=""
        props2=""
        />

    //若能直接一行显示的，直接写成一行
    <Demo props1=""/>

    ```
## 单引号还是双引号
- 对于JSX属性值总是使用双引号（""），其他都是用单引号
   
    ```javaScript
    //bad
    <Demo props=''/>

    //good
    <Demo props=""/>
    ```

## 空格

+ 总是在标签关闭前加一个空格
+ 不要在JSX {} 括号内两边都加空格
    ```javaScript
    //good
    <Demo />

    //good 
    <Demo style={baz}>
    ```

## Refs
- 总是在Refs里使用回调函数

    ```javaScript
    //bad
    <Demo ref="myRef"/>

    //good
    <Demo ref={(ref)=>{this.myRef=ref;}}>
    ```

## 业务开发规范

### 文件头（顺序按照从上到下）

1. 先导react和react-native包里面的组件
2. 导入第三方组件库
3. 导入团队内部的组件库
4. 导入相对路径的文件
5. const常量
6. let变量
   
```javaScript
import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native';
import {} from 'ajd-mobile';
import ReactWeb from 'react-native-web';
import DemoPage from './DemoPage';
const PAGE=1;
let name='value';
```
### 注释
- 文件注释，说明该组件的业务功能
- 方法注释，说明该方法的功能，如果有参数，尽量写参数说明
  
### 封装与分离
- 每个组件不应该[SHOULD NOT] 超过600行
- 每个方法不应该[SHOULD NOT] 超过40行

### 组件内部结构体（从上到下，结构明确）

1. 构造函数 
2. rn的生命周期方法 
3. render方法渲染视图 
4. 自定renderXXX渲染子组件 
5. 自定义方法（接口请求方法与接口API保持相同） 
6. 样式放在最后

```javaScript
export default class DemoComponent extends Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
        this.initVal();
    }
    initVal = () => {
    };
    componentWillMount() {
    }
    render() {
        return (
            <View style={ResStyles.container}>
                {this.renderContent()}
            </View>
        );
    }
    renderContent=()=>{
        return(<View/>);
    }
    loadData=()=>{
    }
}
const styles = StyleSheet.create({
    container: {
    },
});
```

### 性能相关规范
1. 减少setState，减少render
2. 局部渲染可以将props传递到子组件中去渲染
3. 转场动画的卡顿问题，数据请求成功后

```javaScript
InteractionManager.runAfterInteractions（()=>{
        this.setState({
            //执行数据填充
        })
});
```

### 样式

1. 项目的通用样式写在项目通用样式类中
2. 模块通用样式写在模块通用样式类中
3. 文件通用样式写在文件底部的const styles中
4. 独有样式写在行style中

## 参考文献

[参考文献](https://juejin.im/post/5b1637806fb9a01e2950e281)