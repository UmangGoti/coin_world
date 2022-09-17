import * as types from './actionTypes';
import API from '../../ApiService/APIService';
import { endPoints } from '../../Config';
import { apiLoadingStart, apiLoadingStop } from '../Global/actions';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': '711050f525msh406b7bea71896dcp1a3d98jsn7d6f6629f16c',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

export const getAssets = (isLoadding, { SuccessCallback, FailureCallback }) => {
  return dispatch => {
    isLoadding ? dispatch(apiLoadingStart()) : null;
    API.getInstance().Fetch(
      endPoints.assets,
      defaultHeaders,
      {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '10',
        offset: '0',
      },
      {
        SuccessCallback: res => {
          dispatch(apiLoadingStop());
          SuccessCallback(res);
          dispatch({
            type: types.GET_ASSETS,
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
