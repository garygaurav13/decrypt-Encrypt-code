'use strict';

const crypto = require('crypto');
//const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const ENCRYPTION_KEY = 'XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT';
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {

  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(text.toString());

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  let textParts = text.split(':');
  console.log('textParts',textParts);
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  console.log('fdfd==df',encryptedText);

  let decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  console.log('fdfd==',decipher);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log('fdfd',decrypted.toString());
  return decrypted.toString();
}

// Example usage
const textToEncrypt = '9a192b9ab8f1cd0302828baa656f1d86:7794c90985e5c06223baabc020eed50dab6375ae96b0ca679ac790661599a7f9db87940fedf720a730d399c6ee2d393e';
console.log('Original Text:', textToEncrypt);

// const encryptedText = encrypt(textToEncrypt);
// console.log('Encrypted Text:', encryptedText);

const decryptedText = decrypt(textToEncrypt);
console.log('Decrypted Text:', decryptedText);

module.exports = { decrypt, encrypt };
