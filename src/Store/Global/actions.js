import * as types from './actionTypes';

export const apiLoadingStart = () => ({type: types.API_LOADING_START});
export const apiLoadingStop = () => ({type: types.API_LOADING_STOP});
export const noInternetConnected = isConnected => ({
  type: types.IS_INTERNET_CONNECTED,
  payload: isConnected,
});
const onError = data => ({type: types.ON_ERROR_RECEIVED, payload: data});