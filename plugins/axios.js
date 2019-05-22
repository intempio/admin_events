import axios from 'axios'
import {utilsService} from '../services/utils-service';

export const restService = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    Authorization: `Bearer ${utilsService.getToken()}`
  }
});
let requestCount = 0;

restService.interceptors.request.use((req) => {
  requestCount++;
  utilsService.setLoading(true);
  return req;
});

restService.interceptors.response.use(req => {
  requestCount--;
  if (requestCount === 0) {
    setTimeout(() => {
      utilsService.setLoading(false);
    }, 300);
  }
  return req;
}, () => {
  requestCount--;
  if (requestCount === 0) {
    utilsService.setLoading(false);
  }
});
