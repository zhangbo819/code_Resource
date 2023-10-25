import react from 'react';

export const Fn1 = () => {
  console.log("Fn1 in");
  const div = document.createElement("div");
  div.className = "fn1"
  div.innerHTML = "hello";
  const buttonEle = document.createElement("button");
  buttonEle.textContent = "点击一下加载"
  buttonEle.onclick = function () {
    const AsyncModule = import("./AsyncModule");
    console.log(AsyncModule);
  };
  div.appendChild(buttonEle);
  document.body.appendChild(div);
};
console.log("util in");


export const Fn2 = () => {
  // This is an unused function
  const a = 'Thisisanunusedfunction'
  return a
}