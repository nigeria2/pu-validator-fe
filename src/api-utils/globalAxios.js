import axios from "axios";
import { toast } from "react-toastify";

export const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

globalAxios.interceptors.request.use((config) => {
  return config;
});

globalAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 419) {
      toast.error("😎 Session expired!!!", {
        toastId: error.response.status,
      });
    }
    if (error.response.status === 404) {
      toast.error("😎 You are trying to access a resource we don't have!", {
        toastId: error.response.status,
      });
    }
    if (error.response.status === 503) {
      toast.error(
        "we are currently upgrading/improving our setup... try again shortly",
        {
          toastId: error.response.status,
        }
      );
    }
    if (error.response.status === 422) {
      toast.error("Form validation error. Please cross-check your inputs", {
        toastId: error.response.status,
      });
    }
    if (error.response.status === 429) {
      toast.error("Take a deep breathe... 🥵 too many requests in a minute", {
        toastId: error.response.status,
      });
    }

    return Promise.reject(error);
  }
);
