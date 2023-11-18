// eslint-disable-next-line react/jsx-filename-extension
import axios from 'axios';


import backendConfig from './BackendConfig/BackendConfig';
import store from '../store/store';

const HTTP = axios.create({
  baseURL: backendConfig.backendURL,
});

HTTP.interceptors.request.use((config) => {
  const jwtToken = store.getState().user.jwt;
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
});

export default HTTP;
