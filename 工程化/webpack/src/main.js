import AComp from "./AComp";
import { Fn1 } from "./util";
import "./main.css";
import testImage from "./assets/img/testImage.png";

console.log("main in");
Fn1();

AComp.AComp();

const img = document.createElement("img");
img.src = testImage;
document.body.appendChild(img);
