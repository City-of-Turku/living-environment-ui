import axios from 'axios';
import UrlPattern from 'url-pattern';

import config from '../config';

const { api } = config;
const instance = axios.create({
  baseURL: api.baseUrl,
  timeout: api.timeout,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

const client = {
};

const resolveUrl = (url, pathParams = {}) => {
  const pattern = new UrlPattern(url);
  return pattern.stringify(pathParams);
};

['get', 'put', 'delete'].forEach((methodName) => {
  client[methodName] = (url, pathParams, params) => {
    const resolvedUrl = resolveUrl(url, pathParams);
    return instance[methodName](resolvedUrl, { params })
    .then(
      response => response.data,
      error => Promise.reject(error));
  };
});

['post', 'patch'].forEach((methodName) => {
  client[methodName] = (url, pathParams, data) => {
    const resolvedUrl = resolveUrl(url, pathParams);
    return instance[methodName](resolvedUrl, data)
    .then(
      response => response.data,
      error => Promise.reject(error));
  };
});

export default client;
