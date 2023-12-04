import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export function TestRecoil() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "default value", // default value (aka initial value)
});
const arrState = atom<Record<string, any>[]>({
  key: "arrState",
  default: [],
});

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <React.Suspense fallback={<div>加载中。。。</div>}>
        <CharacterCount />
      </React.Suspense>
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const setArr = useSetRecoilState(arrState);

  const onChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
      <button
        onClick={() => {
          setArr((s) => {
            return [...s, {}];
          });
        }}
      >
        setArr
      </button>
    </div>
  );
}

const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const text = get(textState);

    // 异步方式
    await new Promise((resolve) => {
      setTimeout(() => resolve(0), 1000);
    });

    // return text.length;
    return text;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);
  const [arr] = useRecoilState(arrState);

  console.log("count", count);

  return (
    <>
      Character Count: {count}
      <p>arr.length : {arr.length}</p>
    </>
  );
}
