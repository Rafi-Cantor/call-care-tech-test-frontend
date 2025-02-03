import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from '../redux/store/store';
import { logout } from '../redux/slices/userSlice';

const BASEURL = import.meta.env.VITE_BASE_URL;

const client = () => {
  const defaultOptions = {
    baseURL: BASEURL,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    const { access_token } = store.getState().user || {}; 

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 422 && !originalRequest._retry || error.response.status === 401) {
        originalRequest._retry = true;
        toast.error('Session timed out. Please log out and log back in.');
        store.dispatch(logout());
        return Promise.reject();
      }
      return Promise.reject(error);
    }
  );
  
  return instance;
};

const request = client();

export default request;
