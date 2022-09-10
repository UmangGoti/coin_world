import * as types from './actionTypes';

const initialState = {
  coinsData: {},
};

const getAssets = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.GET_ASSETS:
      return { ...state, coinsData: action.payload };
    default:
      return state;
  }
};

export default getAssets;
