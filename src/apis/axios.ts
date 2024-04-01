import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/2-5',
});

instance.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// instance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
//       const res = await instance.post(
//         '/auth/tokens',
//         {},
//         {
//           headers: { Authorization: `Bearer ${refreshToken}`, _retry: true },
//         }
//       );
//       const accessToken = res.data.accessToken;
//       const nextRefreshToken = res.data.refreshToken;
//       localStorage.setItem('accessToken', accessToken);
//       localStorage.setItem('refreshToken', nextRefreshToken);
//       originalRequest._retry = true;

//       return instance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );
