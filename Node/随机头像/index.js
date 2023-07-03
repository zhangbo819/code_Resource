// import crypto from "crypto";
const crypto = require("crypto");
const Identicon = require("identicon.js");

let hash = crypto.createHash("md5");
hash.update("zzb"); // 传入用户名
let imgData = new Identicon(hash.digest("hex")).toString();
let imgUrl = "data:image/png;base64," + imgData; // 这就是头像的base64码

console.log(imgUrl);
