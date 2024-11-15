import { BACKEND_HOST, BACKEND_PORT } from '../config'
import authStore from '../../store/auth';

// http request tool used to send request to backend api
export const http = (url, method = 'GET', data = {}, needAuth = true) => {
  let headers = { 'Content-Type': 'application/json' };
  const token = authStore.getState().getToken();
  url = `${BACKEND_HOST}:${BACKEND_PORT}${url}`;
  if (needAuth) {
    if (!token) {
      return;
    }
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
  const body = method === 'POST' || method === 'PUT' || method === 'DELETE'
    ? JSON.stringify(data)
    : null;

  return fetch(url, {
    method,
    body,
    headers
  }).then(res => res.json());
}
