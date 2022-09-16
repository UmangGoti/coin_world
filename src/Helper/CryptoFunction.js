import '@ethersproject/shims';
import { ethers } from 'ethers';
import { NativeModules } from 'react-native';
import 'react-native-randombytes';
import '../../shim';
import {
  GetEncryptedData,
  GetPasswordHash,
  StoreEncryptedData,
  storeIVBase64,
  StorePasswordHash,
} from '../Helper/Storage';
const Aes = NativeModules.Aes;

export const generateAesKey = async (password, salt) => {
  try {
    let key = await Aes.pbkdf2(password, salt, 5000, 256);
    return { key: key };
  } catch (error) {
    console.log(error);
    return { key: '' };
  }
};

export const encrypt = async (privateKey, aesKeyBase64) => {
  const ivBase64 = storeIVBase64;
  const cipherData = await Aes.encrypt(
    privateKey,
    aesKeyBase64,
    ivBase64,
    'aes-256-cbc',
  );

  StoreEncryptedData(cipherData);

  return { cipherData, ivBase64 };
};

// Decryption will required EncryptedData and Key.
export const decrypt = (encryptedData, aesKeyBase64) =>
  Aes.decrypt(encryptedData, aesKeyBase64, storeIVBase64, 'aes-256-cbc');

export const generateWalletMnemonic = () => {
  ethers.Wallet.createRandom([(options = {})]).then(data => {
    return data;
  });
};

export const generatePasswordHash = (pwd, aesKeyBase64) => {
  try {
    Aes.hmac256(pwd, aesKeyBase64).then(hashData => {
      /**
       * Store Password Hash
       */
      StorePasswordHash(hashData);
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const VerifyPassword = async password => {
  let storedHash = await GetPasswordHash().then(hashData => {
    // console.log('hash-1', hashData);
    return hashData;
  });
  let generatedAeskey = await generateAesKey(password, 'salt').then(data => {
    // console.log(data?.key);
    return data?.key;
  });
  let generatedHash = await Aes.hmac256(password, generatedAeskey).then(
    hashData => {
      // console.log('hash-2', hashData);
      return hashData;
    },
  );

  if (storedHash == generatedHash) {
    let encryptData = await GetEncryptedData().then(data => {
      // console.log('EncryptedData - ', data);
      return data;
    });
    let decryptData = await decrypt(encryptData, generatedAeskey).then(data => {
      // console.log(data);
      return data;
    });
    return decryptData;
  } else {
    return false;
  }
};

export const WalletCreate = async privateKey => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mainnet.infura.io/v3/295cce92179b4be498665b1b16dfee34',
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log('wallet', wallet);
  const signer = wallet.connect(provider);
  const address = await signer.getAddress();
  console.log('signer', signer);
  console.log(address);
};
