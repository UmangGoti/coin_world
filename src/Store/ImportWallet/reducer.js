import * as types from './actionTypes';

const initialState = {
  walletDetails: {},
};

const ImportWallet = (state = initialState, action) => {
  switch (action.type) {
    case types.IMPORT_WALLET:
      return {
        ...state,
        walletDetails: action.payload,
      };
    default:
      return state;
  }
};

export default ImportWallet;
