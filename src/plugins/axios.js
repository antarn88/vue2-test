import axios from "axios";

export default function ({ store }) {
  axios.interceptors.request.use(
    (config) => {
      if (store.state.auth.accessToken) {
        config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}
