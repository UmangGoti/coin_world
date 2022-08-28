import * as types from './actionTypes';

const initialState = {
  loading: false,
  userDetail: {},
  isInternetConnected: true,
  errorMessage: '',
  isError: false,
};

const global = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.API_LOADING_START:
      return {...state, loading: true};
    case types.API_LOADING_STOP:
      return {...state, loading: false};
    case types.ON_ERROR_RECEIVED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message,
        isError: action.payload.type,
      };
    case types.IS_INTERNET_CONNECTED:
      console.warn(action.payload);
      if (action.payload === false) {
        return {...state, isInternetConnected: action.payload, loading: false};
      } else {
        return {...state, isInternetConnected: action.payload};
      }
    default:
      return state;
  }
};

export default global;
