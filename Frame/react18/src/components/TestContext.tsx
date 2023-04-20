import React, { FC, useContext, useReducer } from "react";

type actionType = { type: string; payload: any };
interface InitStateType {
  count: number;
}

const CurrentContext = React.createContext<{
  state: InitStateType;
  dispatch?: React.Dispatch<actionType>;
}>({ state: { count: 0 } });
const Provider = CurrentContext.Provider;

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "setCount":
      return { ...state, count: action.payload };
  }
};

export const TestContext: FC = () => {
  const [state, dispatch] = useReducer(reducer, { count: 1 });

  return (
    <Provider value={{ state, dispatch }}>
      <Children></Children>
      <OtherChildren></OtherChildren>
    </Provider>
  );
};

const Children: FC = () => {
  const {
    state: { count },
    dispatch,
  } = useContext(CurrentContext);

  return (
    <div
      style={{ padding: 10 }}
      onClick={() => {
        // 当触发 context 更新时，下面没有用到相关状态的 OtherChildren 也重新 render 了
        dispatch?.({ type: "setCount", payload: count + 1 });
      }}
    >
      {count}
    </div>
  );
};


const OtherChildren: FC = () => {
  console.log('OtherChildren render 了')
  return <div>OtherChildren</div>
}

// 需要用 memo 包住
// const OtherChildren: FC = memo(() => {
//   console.log('OtherChildren render 了')
//   return <div>OtherChildren</div>
// })