import axios from 'axios';

import { postRefreshPost } from './user';

const BASE_URL = '/api';

export const service = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
});
service.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(async (response) => {
  if (response.data.info === 'token invalid') {
    if (response.config.url === '/user/refresh') {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
    } else {
      const newAccessToken = await postRefreshPost({
        refresh_token: localStorage.getItem('refresh_token'),
      });

      localStorage.setItem('access_token', newAccessToken.data.access_token);
      const originalRequest = response.config;
      originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
      return service(originalRequest);
    }
  }
  return response;
});
