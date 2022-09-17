import * as types from './actionTypes';
import API from '../../ApiService/APIService';
import { endPoints } from '../../Config';
import { apiLoadingStart, apiLoadingStop } from '../Global/actions';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': '711050f525msh406b7bea71896dcp1a3d98jsn7d6f6629f16c',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

export const getCoinInfo = (
  isLoadding,
  coinuuid,
  { SuccessCallback, FailureCallback },
) => {
  return dispatch => {
    isLoadding ? dispatch(apiLoadingStart()) : null;
    var objEndpoint = Object.assign({}, endPoints.coin);
    objEndpoint['endpoint'] = objEndpoint['endpoint'] + coinuuid;
    API.getInstance().Fetch(
      objEndpoint,
      defaultHeaders,
      { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h' },
      {
        SuccessCallback: res => {
          dispatch(apiLoadingStop());
          SuccessCallback(res);
          dispatch({
            type: types.GET_COININFO,
            payload: res.data,
          });
        },
        FailureCallback: res => {
          dispatch(apiLoadingStop());
          FailureCallback(res);
        },
      },
    );
  };
};
