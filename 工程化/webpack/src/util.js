export const Fn1 = () => {
  console.log("Fn1 in");
  const div = document.createElement("div");
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
