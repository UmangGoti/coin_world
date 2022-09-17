import * as types from './actionTypes';

const initialState = {
  coinInfo: {},
};

const getCoinInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COININFO:
      return { ...state, coinInfo: action.payload };
    default:
      return state;
  }
};

export default getCoinInfo;
