import React from "react";
// import { TestRender } from "./components/TestRender";
// import { TestContext } from "./components/TestContext";
// import { TestSuspense } from "./components/TestSuspense";
import { TestRecoil } from "./components/TestRecoil";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">React 18 Test</header>
      {/* 测试 render */}
      {/* <TestRender></TestRender> */}
      {/* 测试 Context */}
      {/* <TestContext></TestContext> */}
      {/* 测试 Suspense */}
      {/* <TestSuspense></TestSuspense> */}
      {/* 测试 Recoil */}
      <TestRecoil></TestRecoil>
    </div>
  );
}

export default App;
