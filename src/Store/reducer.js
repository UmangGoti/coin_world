import { combineReducers } from 'redux';

import global from './Global';
import getAssets from './GetAssets';
import getCoinInfo from './GetCoinInfo';

export default combineReducers({
  global,
  getAssets,
  getCoinInfo
});
