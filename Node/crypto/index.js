const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'cd8a80d350a85c9e95f39aa1a3b62037';
const iv = crypto.randomBytes(16);

// 加密
const encrypt = (text) => {

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

// 解密
const decrypt = (hash) => {

  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt
};