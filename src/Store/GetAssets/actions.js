import * as types from './actionTypes';
import API from '../../ApiService/APIService';
import { endPoints } from '../../Config';
import { apiLoadingStart, apiLoadingStop } from '../Global/actions';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const getAssets = (isLoadding, { SuccessCallback, FailureCallback }) => {
  return dispatch => {
    isLoadding ? dispatch(apiLoadingStart()) : null;
    API.getInstance().Fetch(endPoints.assets, defaultHeaders, '', {
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
    });
  };
};
