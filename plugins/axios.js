import axios from 'axios'
import {authService} from '../services/auth-service';

const LOADER_EXCEPTIONS = [];

export const restService = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    Authorization: `Bearer ${authService.getToken()}`,
    updated_by_id: authService.getUser().email
  }
});

let requestCount = 0;

restService.interceptors.request.use((req) => {
  if (!LOADER_EXCEPTIONS.includes(req.url)) {
    requestCount++;
    authService.setLoading(true);
  }
  return req;
});

restService.interceptors.response.use(req => {
  reqCountSub();
  return req;
}, error => {
  reqCountSub();
  return Promise.reject(error.response.data);
});

const reqCountSub = () => {
  requestCount--;
  if (requestCount <= 0) {
    authService.setLoading(false);
    requestCount = 0;
  }
};
