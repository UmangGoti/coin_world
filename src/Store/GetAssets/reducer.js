import * as types from './actionTypes';

const initialState = {
  assets: [],
};

const getAssets = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.GET_ASSETS:
      return { ...state, assets: action.payload };
    default:
      return state;
  }
};

export default getAssets;
