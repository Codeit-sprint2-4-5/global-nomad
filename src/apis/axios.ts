import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/2-5',
});

//axios login 함수
// const login = async (data: typeof MookLoginData) => {
//   try {
//     const res = await instance.post('/auth/login', data, { headers: { 'Content-Type': 'application/json' } });
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     const accessToken = res.data.accessToken;
//     const refreshToken = res.data.refreshToken;
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);

//     return res.data;
//   } catch (error: any) {
//     return alert(error.message);
//   }
// };

//TODO
//console 에 처음 복사 붙여넣기 할 함수

export const MookLoginData = {
  email: 'aaa@naver.com',
  password: 'qwer1234',
};

const login = async (data: typeof MookLoginData) => {
  try {
    const response = await fetch('https://sp-globalnomad-api.vercel.app/2-5/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다');
    }

    const res = await response.json();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return res.data;
  } catch (error: any) {
    console.error('로그인 중 오류 발생:', error.message);
  }
};

//login(MookLoginData);

// ▲ 런타임에러 날 수 있어서 주석처리함

//아규먼트에 넣고싶은 email, password 값 넣어주시면 됩니다

instance.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refreshToken');

      const res = await instance.post('/auth/tokens', {
        headers: { Authorization: `bearer ${refreshToken}`, _retry: true },
      });
      const accessToken = res.data.accessToken;
      const nextRefreshToken = res.data.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', nextRefreshToken);
      originalRequest._retry = true;

      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);
