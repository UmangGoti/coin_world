import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store Password Hash
 * @param {*} value
 * @returns
 */
export const StorePasswordHash = async value => {
  try {
    await AsyncStorage.setItem(PasswordHash, value);
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * Get Password Hash
 * @returns GetPasswordHash
 */
export const GetPasswordHash = async () => {
  try {
    const value = await AsyncStorage.getItem(PasswordHash);
    if (value !== null) {
      return value;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const storeIVBase64 = '9ebec0b065890bab2328c7f41bd33c48';

/**
 * Store Generated Key (Aes encrypt key)
 * @param {*} aesKey
 * @returns
 */
export const StoreEncryptedData = async aesKey => {
  try {
    await AsyncStorage.setItem(EncryptedData, aesKey);
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * Get Encrypted Data
 * @returns
 */
export const GetEncryptedData = async () => {
  try {
    const aesKey = await AsyncStorage.getItem(EncryptedData);
    if (aesKey !== null) {
      return aesKey;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const EncryptedData = `EncryptedData`;
export const PasswordHash = `PasswordHash`;
export var profileImage = '';
export var publicAddress = '';
