import * as types from './actionTypes';

const initialState = {
  walletDetails: null,
};

const CreateWallet = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_WALLET:
      return { ...state, walletDetails: action.payload };
    default:
      return state;
  }
};

export default CreateWallet;
