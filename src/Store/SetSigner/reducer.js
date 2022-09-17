import * as types from './actionTypes';

const initialState = {
  signer: {},
  address: '',
  ethersBalance: '',
  imageUri: '',
};

const SetSigner = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNER_VALUE:
      return {
        ...state,
        signer: action.signer,
        address: action.address,
        ethersBalance: action.ethersBalance,
        uri: action.uri,
      };
    default:
      return state;
  }
};

export default SetSigner;
