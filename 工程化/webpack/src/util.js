export const Fn1 = () => {
  console.log("Fn1 in");
  const div = document.createElement("div");
  div.innerHTML = "hello";
  buttonEle.onclick = function () {
    const AsyncModule = import('./AsyncModule')
    console.log(AsyncModule)
  };
  document.body.appendChild(div);
};
console.log("util in");
