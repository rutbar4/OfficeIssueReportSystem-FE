import axios from 'axios';
import { useSelector } from 'react-redux';

import backendConfig from './BackendConfig/BackendConfig';
import store, { RootState } from '../store/store';

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
