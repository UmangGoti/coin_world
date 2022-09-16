import * as types from './actionTypes';

const initialState = {
  mnemonic: null,
};

const CreateWallet = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.CREATE_WALLET:
      return { ...state, mnemonic: action.payload };
    default:
      return state;
  }
};

export default CreateWallet;
