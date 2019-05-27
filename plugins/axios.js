import axios from 'axios'
import {utilsService} from '../services/utils-service';

const LOADER_EXCEPTIONS = [process.env.VUE_APP_API + '/api/v3/events/'];

export const restService = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    Authorization: `Bearer ${utilsService.getToken()}`
  }
});

let requestCount = 0;

restService.interceptors.request.use((req) => {
  if (!LOADER_EXCEPTIONS.includes(req.url)) {
    requestCount++;
    utilsService.setLoading(true);
  }
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
