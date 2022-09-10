import { Method } from './ApiService';
export const appName = 'CoinWorld';

export const apiConfig = {
  productionBaseURL: 'https://coinranking1.p.rapidapi.com/' /*release build*/,
  testingBaseURL: 'https://coinranking1.p.rapidapi.com/' /*inteneal testing*/,
  developmentBaseURL:
    'https://coinranking1.p.rapidapi.com/' /*for client test*/,
  alphaBaseURL: 'https://coinranking1.p.rapidapi.com/',
};

export const endPoints = {
  assets: {
    endpoint: '/coins',
    method: Method.GET,
  },
  coin: {
    endpoint: '/coin/',
    method: Method.GET,
  },
};
