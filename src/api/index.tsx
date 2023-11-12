import axios from 'axios';

import backendURL from './BackendConfig/BackendConfig';
import store from '../store/store';
const HTTP = axios.create(
  {
    baseURL:'http://localhost:8080'
  }
);

HTTP.interceptors.request.use(config =>{
  const jwtToken = store.getState().user.jwtToken;
  if(jwtToken){
    config.headers.Authorization = `Barer ${jwtToken}`;
  }
  return config;
});

export default HTTP;
