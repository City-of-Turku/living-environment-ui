import axios from 'axios';
import UrlPattern from 'url-pattern';

import config from '../config';


const { api } = config;
const instance = axios.create({
  baseURL: api.baseUrl,
  timeout: api.timeout,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
});

const client = {
  resolveUrl(url, pathParams = {}) {
    const pattern = new UrlPattern(url);
    return pattern.stringify(pathParams);
  },
  get(url, pathParams, params) {
    const resolvedUrl = this.resolveUrl(url, pathParams);
    return instance.get(resolvedUrl, { params })
    .then(
      response => response.data,
      error => error);
  },
  post(url, pathParams, data) {
    const resolvedUrl = this.resolveUrl(url, pathParams);
    return instance.post(resolvedUrl, data)
    .then(
      response => response.data,
      error => error);
  },
  put(url, pathParams, params) {
    const resolvedUrl = this.resolveUrl(url, pathParams);
    return instance.put(resolvedUrl, { params })
    .then(
      response => response.data,
      error => error);
  },
  delete(url, pathParams, params) {
    const resolvedUrl = this.resolveUrl(url, pathParams);
    return instance.delete(resolvedUrl, { params })
    .then(
      response => response.data,
      error => error);
  },
};

export default client;
