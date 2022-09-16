import { combineReducers } from 'redux';

import global from './Global';
import getAssets from './GetAssets';
import getCoinInfo from './GetCoinInfo';
import createWallet from './CreateWallet';
import setSigner from './SetSigner';

export default combineReducers({
  global,
  getAssets,
  getCoinInfo,
  createWallet,
  setSigner
});
