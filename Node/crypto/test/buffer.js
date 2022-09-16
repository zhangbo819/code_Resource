const { encrypt, decrypt } = require('../index');

// const target = 'Hello World!'
const target = require('./file.json')
const hash = encrypt(Buffer.from(JSON.stringify(target), 'utf8'));

console.log(hash);

// {
//     iv: '692e44dbbea073fc1a8d1c37ea68dffa',
//     content: 'bbffd902d55d7a00f3a0504e'
// }

const text = decrypt(hash);

console.log(text); // Hello World!