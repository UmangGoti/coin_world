import * as types from './actionTypes';

const initialState = {
  signer: {},
  address: '',
  ethersBalance: '',
};

const SetSigner = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.SIGNER_VALUE:
      return {
        ...state,
        signer: action.signer,
        address: action.address,
        ethersBalance: action.ethersBalance,
      };
    default:
      return state;
  }
};

export default SetSigner;
