import { combineReducers } from 'redux';

import global from './Global';
import getAsset from './GetAssets';

export default combineReducers({
  global,
  getAsset,
});
