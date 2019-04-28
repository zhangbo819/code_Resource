# React 代码规范

## 内容目录
	
- React/JSX代码规范
  - [文件与组件命名](#文件与组件命名)
  - [组件声明](#组件声明)
  - [对齐](#对齐)
  - [引号](#引号)
  - [空格](#空格)
  - [state/props](#state/props)
  - [括号](#括号)
  - [标签](#标签)
  - [方法](#方法)
  - [方法声明的顺序](#方法声明的顺序)


## React/JSX代码规范
### 文件与组件命名

  - **扩展名**: 使用`.js`作为js文件的扩展名。如果同一个文件夹下有同名而不同作用的js文件，则通过中缀（小写）进一步区分，例如：`HomeView.component.js`,`HomeView.style.js`,`HomeView.action.js`等。
  - **文件名**: 使用驼峰命名法且首字母大写，如`HomeView.js`。
  - **组件命名**: 与文件名（除中缀外）完全一致。如果组件单独放置在目录中，则目录名也一致。  
  
    ```javascript
    // bad
    import Footer from './Component/Footer/FooterView'

    // good
    import Footer from './Component/Footer/Footer'

    // good
    import Footer from './Footer'
    ```


### 组件声明
  - 使用class与extends关键字。不使用React.createClass方法。需要导出的组件直接在class关键字前使用export default。
    ```javascript
    // bad
    export default React.createClass({
    });

    // good
    export default class HomeView extends React.Component {
    }
    ```

### 对齐
  - 按下面的案例对齐：

    ```javascript
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />

    // 如果一行能摆下props，那就摆在一行
    <Foo bar="bar" />

    // 子组件照常缩进
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    >
      <Spazz />
    </Foo>
    ```

### 引号
  - 对于JSX的字符串属性使用双引号(`"`)，其他情况下使用单引号。

    ```javascript
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />

    // bad
    <Foo style={{ left: "20px" }} />

    // good
    <Foo style={{ left: '20px' }} />
    ```

### 空格
  - 在自闭合的标签中包含一个空格。
    ```javascript
    // bad
    <Foo/>

    // very bad
    <Foo                 />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```

### state/props
  - 对于多个单词组成的pros，使用驼峰命名法。不使用下划线或连接线。
    ```javascript
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
    />
    ```
  - 读取state和props时，使用const与解构，必要时可使用let。不使用var。
    ```javascript
    // bad
    var userName = this.props.userName;
    let checked = this.state.checked;

    // good
    const { userName, age, sex } = this.props;
    const { checked } = this.state;
    ```  
    
### 括号
  - 当JSX标签超过一行时，使用括号包裹。
    ```javascript
    /// bad
    render() {
      return <MyComponent className="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent className="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

### 标签
  - 对于没有子组件的JSX标签，始终自闭合。
    ```javascript
    // bad
    <Foo className="stuff"></Foo>

    // good
    <Foo className="stuff" />
    ```

  - 如果组件有多行属性，则另起一行进行自闭合。
    ```javascript
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```

### 方法
  - 为方法命名时，不使用下划线开头（哪怕是想用作私有方法）。
    ```javascript
    // bad
    React.createClass({
      _onClickSubmit() {
        // do stuff
      }

      // other stuff
    });

    // good
    class extends React.Component {
      onClickSubmit() {
        // do stuff
      }

      // other stuff
    });
    ```

### 方法声明的顺序

  - 原则上按如下顺序排列React组件的各个方法（生命周期）：
  
  1. constructor
  2. 静态方法（static methods)
  3. getChildContext
  4. componentWillMount
  5. componentDidMount
  6. componentWillReceiveProps
  7. shouldComponentUpdate
  8. componentWillUpdate
  9. componentDidUpdate
  10. componentWillUnmount
  11. 点击处理或事件处理函数，比如onClickSubmit()、onChangeDescription()
  12. 用在render中的getter方法，比如getSelectReason()、getFooterContent()
  13. 可选的render方法，比如renderNavigation()、renderProfilePicture()
  14. render

  - 按如下方式定义propTypes, defaultProps, contextTypes等  

  ```javascript
  import React, { Component, PropTypes } from 'react';
  
  const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };
  
  const defaultProps = {
    text: 'Hello World',
  };
  
  class Link extends Component {
    static methodsAreOk() {
      return true;
    }
  
    render() {
      return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
    }
  }
  
  Link.propTypes = propTypes;
  Link.defaultProps = defaultProps;
  
  export default Link;
  ```

**[⬆ 回到目录](#内容目录)**

