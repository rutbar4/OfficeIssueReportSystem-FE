import axios from 'axios';

import backendConfig from './BackendConfig/BackendConfig';
import store from '../store/store';

const HTTP = axios.create({
  baseURL: backendConfig.backendURL,
});

HTTP.interceptors.request.use((config) => {
  const jwtToken = store.getState().user.jwtToken;
  if (jwtToken) {
    config.headers.Authorization = `Barer ${jwtToken}`;
  }
  return config;
});

export default HTTP;
