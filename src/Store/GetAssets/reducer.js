import * as types from './actionTypes';

const initialState = {
  coinsData: {},
};

const getAssets = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ASSETS:
      return { ...state, coinsData: action.payload };
    default:
      return state;
  }
};

export default getAssets;
