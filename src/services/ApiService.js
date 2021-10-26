import axios from "axios";
import storage from "redux-persist/lib/storage";

const ApiService = axios.create({
  baseURL: "https://bitcoin-wallet-api.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

ApiService.interceptors.request.use(
  async (config) => {
    let token = null;
    const rootPersist = await storage.getItem("persist:root-bitcoin");

    if (rootPersist) {
      const { user } = JSON.parse(rootPersist);
      token = user ? JSON.parse(user).token : null;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { ApiService };
