import '@ethersproject/shims';
import { Wallet } from 'ethers';
import 'react-native-randombytes';
import {
  encrypt,
  generateAesKey,
  generatePasswordHash,
} from '../../Helper/CryptoFunction';
import { apiLoadingStart, apiLoadingStop } from '../Global/actions';
import * as types from './actionTypes';

export const ImportWallet = (
  isLoadding,
  phrase,
  password,
  { SuccessCallback, FailureCallback },
) => {
  return dispatch => {
    isLoadding ? dispatch(apiLoadingStart()) : null;
    let walletDetails = Wallet.fromMnemonic(phrase);
    let walletPrivateKey = new Wallet(walletDetails.privateKey);
    if (walletDetails?.address === walletPrivateKey.address) {
      dispatch({
        type: types.IMPORT_WALLET,
        payload: walletDetails,
      });
      dispatch(apiLoadingStop());
      SuccessCallback(walletDetails?.privateKey);
    } else {
      dispatch({
        type: types.IMPORT_WALLET,
        payload: {},
      });
      FailureCallback(true);
      dispatch(apiLoadingStop());
    }

    /**
     * Generate Aes key
     */
    generateAesKey(password, 'salt')
      .then(data => {
        console.log('Aes Key', data.key);

        /**
         * Encrypt Aes key
         */
        encrypt(walletDetails.privateKey, data.key)
          .then(encryptData => {
            console.log('Encrypt Key', encryptData);
          })
          .catch(error => console.log(error));

        /**
         * Generate Password Hash
         */
        const hashData = generatePasswordHash(password, data.key);
        console.log('isPwdHashGenerated', hashData);
      })
      .catch(error => console.log(error));
  };
};
