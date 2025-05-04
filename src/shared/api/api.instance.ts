import axios from 'axios';
import authToken from '../localstorage/authToken';

// Create base API instance
const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// который к каждому запросу добавляет accessToken из localStorage
apiInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${authToken.get()}`;
  return config;
});

// // создаем перехватчик ответов
// // который в случае невалидного accessToken попытается его обновить
// // и переотправить запрос с обновленным accessToken
// apiInstance.interceptors.response.use(
//   // в случае валидного accessToken ничего не делаем:
//   (config) => {
//     return config;
//   },
//   // в случае просроченного accessToken пытаемся его обновить:
//   async (error) => {
//     // предотвращаем зацикленный запрос, добавляя свойство _isRetry
//     const originalRequest = { ...error.config };
//     originalRequest._isRetry = true;
//     if (
//       // проверим, что ошибка именно из-за невалидного accessToken
//       error.response.status === 401 &&
//       // проверим, что запрос не повторный
//       error.config &&
//       !error.config._isRetry
//     ) {
//       try {
//         // запрос на обновление токенов
//         const resp = await apiInstance.get('/api/refresh');
//         // сохраняем новый accessToken в localStorage
//         authToken.set(resp.data.accessToken);
//         // переотправляем запрос с обновленным accessToken
//         return apiInstance.request(originalRequest);
//       } catch (error) {
//         console.log('AUTH ERROR', error);
//       }
//     }
//     // на случай, если возникла другая ошибка (не связанная с авторизацией)
//     // пробросим эту ошибку
//     throw error;
//   },
// );

export default apiInstance;
