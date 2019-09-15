
import React, { Component } from 'react';

const context = React.createContext();

const { Provider } = context;

export default class Context extends Component {
    state = {
        counter: 0
    };

    add = () => { this.setState({ counter: this.state.counter + 1 }) }

    render() {
        return <Provider value={{ counter: this.state.counter, add: this.add }}>
            <Border />

            {/* <Consumer>
                {value => <Child {...value}></Child>}
            </Consumer> */}
        </Provider>
    }
}

class Border extends Component {
    // static contextType = context;
    
    render() {
        return <div style={{ padding: '5px', backgroundColor: '#f008' }}>
            <Child ></Child>
        </div>
    }
}
// Border.contextType = Consumer;


class Child extends Component {
    static contextType = context;

    render() {
        const { add, counter } = this.context;

        return <div onClick={add}>
            {counter}
        </div>
    }
}
