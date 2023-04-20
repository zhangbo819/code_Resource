import React from "react";
// import { TestRender } from "./components/TestRender";
import "./App.css";
import { TestContext } from "./components/TestContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">React 18 Test</header>
      {/* 测试 render */}
      {/* <TestRender></TestRender> */}
      {/* 测试 Context */}
      <TestContext></TestContext>
    </div>
  );
}

export default App;
