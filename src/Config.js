import { Method } from './ApiService';
export const appName = 'CoinWorld';

export const apiConfig = {
  productionBaseURL: 'https://api.coincap.io/v2' /*release build*/,
  testingBaseURL: 'https://api.coincap.io/v2' /*inteneal testing*/,
  developmentBaseURL: 'https://api.coincap.io/v2' /*for client test*/,
  alphaBaseURL: 'https://api.coincap.io/v2',
};

export const endPoints = {
  assets: {
    endpoint: '/assets',
    method: Method.GET,
  },
};
