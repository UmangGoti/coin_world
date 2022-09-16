import '@ethersproject/shims';
import ethers from 'ethers';
import 'react-native-randombytes';
import { isNullOrUndefined } from '../../Helper/Utils';
import { provider } from '../../Helper/Constants';
import * as types from './actionTypes';

export const SetSigner = (
  isLoadding,
  key,
  { SuccessCallback, FailureCallback },
) => {
  return async dispatch => {
    isLoadding ? dispatch(apiLoadingStart()) : null;

    const wallet = new ethers.Wallet(key, provider);
    let signer = wallet.connect(provider);
    let address = signer.address;
    let balance = await signer.getBalance();
    let balanceInEth = ethers.utils.formatEther(balance);
    console.log(balance, balanceInEth);

    if (!isNullOrUndefined(address) && !isNullOrUndefined('')) {
      dispatch({
        type: types.SIGNER_VALUE,
        signer: signer,
        address: address,
        ethersBalance: 0,
      });
    } else {
      dispatch({
        type: types.SIGNER_VALUE,
        signer: {},
        address: '',
        ethersBalance: '',
      });
    }
  };
};

export default SetSigner;
