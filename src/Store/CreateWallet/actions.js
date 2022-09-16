import '@ethersproject/shims';
import { ethers } from 'ethers';
import 'react-native-randombytes';
import { apiLoadingStart, apiLoadingStop } from '../Global/actions';
import { SetSigner } from '../SetSigner/actions';
import * as types from './actionTypes';

export const CreateWallet = (
  isLoadding,
  { SuccessCallback, FailureCallback },
) => {
  return dispatch => {
    isLoadding ? dispatch(apiLoadingStart()) : null;
    let walletDetails = ethers.Wallet.createRandom([(options = {})]);
    console.log(
      JSON.stringify(walletDetails?.mnemonic),
      walletDetails?.privateKey,
    );
    if (walletDetails?.mnemonic) {
      dispatch({
        type: types.CREATE_WALLET,
        payload: walletDetails,
      });
      dispatch(
        SetSigner(true, walletDetails?.privateKey, {
          SuccessCallback: res => {
            console.log(JSON.stringify(res));
          },
          FailureCallback: res => {
            console.log(JSON.stringify(res));
          },
        }),
      );
      dispatch(apiLoadingStop());
      SuccessCallback(walletDetails?.privateKey);
    } else {
      FailureCallback(true);
      dispatch(apiLoadingStop());
    }
  };
};
