import '@ethersproject/shims';
import { ethers } from 'ethers';
import 'react-native-randombytes';
import { apiLoadingStart, apiLoadingStop } from '../Global/actions';
import * as types from './actionTypes';

export const CreateWallet = (
  isLoadding,
  { SuccessCallback, FailureCallback },
) => {
  return dispatch => {
    isLoadding ? dispatch(apiLoadingStart()) : null;
    let walletDetails = ethers.Wallet.createRandom([(options = {})]);
    if (walletDetails?.mnemonic) {
      dispatch({
        type: types.CREATE_WALLET,
        payload: walletDetails,
      });
      dispatch(apiLoadingStop());
      SuccessCallback(walletDetails?.privateKey);
    } else {
      FailureCallback(true);
      dispatch(apiLoadingStop());
    }
  };
};
