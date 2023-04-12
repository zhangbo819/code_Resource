import React, { FC, useEffect, useState, memo, useCallback } from "react";

const ChildrenComp: FC<{
  fn?: () => void;
}> = ({ fn }) => {
  console.log("ChildrenComp 重新 render 了");
  return <div onClick={fn}>ChildrenComp</div>;
};

const ChildrenCompMemo = memo(ChildrenComp);

export const TestRender: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((a) => a + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const fn = () => {};
  const fnUseCb = useCallback(() => {}, []);

  return (
    <div>
      count: {count}
      {/* 普通组件 
          结论 当父组件更改状态时，即使子组件没有引用那个属性也会重新 render，除非做一些优化 
      */}
      {/* <ChildrenComp></ChildrenComp> */}
      {/* 
          React 优化 
      */}
      {/* Memo */}
      {/* <ChildrenCompMemo></ChildrenCompMemo> */}
      {/* Memo 传递普通参数  */}
      {/* <ChildrenCompMemo fn={fn}></ChildrenCompMemo> */}
      {/* Memo 传递 useCallback  */}
      <ChildrenCompMemo fn={fnUseCb}></ChildrenCompMemo>
    </div>
  );
};
