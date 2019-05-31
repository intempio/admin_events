import axios from 'axios'
import {authService} from '../services/auth-service';

const LOADER_EXCEPTIONS = [process.env.VUE_APP_API + '/api/v3/events/'];

export const restService = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    Authorization: `Bearer ${authService.getToken()}`
  }
});

let requestCount = 0;
let timeout;

restService.interceptors.request.use((req) => {
  if (!LOADER_EXCEPTIONS.includes(req.url)) {
    clearTimeout(timeout);
    requestCount++;
    authService.setLoading(true);
  }
  return req;
});

restService.interceptors.response.use(req => {
  requestCount--;
  if (requestCount <= 0) {
    timeout = setTimeout(() => {
      authService.setLoading(false);
      requestCount = 0;
    }, 300);
  }
  return req;
});

