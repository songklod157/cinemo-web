import axios, { AxiosRequestConfig, AxiosResponse ,AxiosRequestHeaders} from 'axios';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
  }
const baseURL = "https://www.majorcineplex.com/apis";
const axiosInstance = axios.create({
    baseURL,
  });

axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers = config.headers || {};
    }

    return config;
  },
  (error) => {
    //request errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    //successful responses
    return response;
  },
  (error) => {
    //response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;