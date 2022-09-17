import '@ethersproject/shims';
import { ethers } from 'ethers';
import 'react-native-randombytes';
import { toDataUrl } from '../../Components/Blockies';
import { provider } from '../../Helper/Constants';
import { isNullOrUndefined } from '../../Helper/Utils';
import { apiLoadingStart, apiLoadingStop } from '../Global/actions';
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

    if (signer) {
      SuccessCallback(signer);
    } else {
      FailureCallback({});
    }
    if (!isNullOrUndefined(address) && !isNullOrUndefined(balance)) {
      let uri = toDataUrl(address);
      dispatch({
        type: types.SIGNER_VALUE,
        signer: signer,
        address: address,
        ethersBalance: balanceInEth,
        uri: uri,
      });
      dispatch(apiLoadingStop());
    } else {
      dispatch({
        type: types.SIGNER_VALUE,
        signer: {},
        address: '',
        ethersBalance: '',
        imageUri: uri,
      });
    }
  };
};

export default SetSigner;
