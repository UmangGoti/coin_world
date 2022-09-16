import '@ethersproject/shims';
import { ethers } from 'ethers';

export const network =
  'https://kovan.infura.io/v3/295cce92179b4be498665b1b16dfee34';

export const provider = new ethers.providers.JsonRpcProvider(network);
