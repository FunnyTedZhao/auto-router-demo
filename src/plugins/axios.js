import axios from 'axios';

const axioser = axios.create({
  baseURL: 'https://www.fastmock.site/mock/a3ac2dd63a10e73fc046f23598de5440/auto-router',
});

/* request 拦截器 */
axioser.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

/* response 拦截器 */
axioser.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axioser;
