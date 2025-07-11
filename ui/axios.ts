import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_DB_URL;
export const axiosBaseConfig: AxiosRequestConfig = {
  baseURL,
};
const apiInstance = axios.create(axiosBaseConfig);

apiInstance.interceptors.request.use(
  async (config) => {

    const session = await getSession();
    const token = session?.user?.access_token;

    config.headers = {
      Authorization: "Bearer " + token,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const refreshToken = localStorage.getItem("refreshToken");
    // const data = loadStorageData(['refresh_token'])
    // const refreshToken = data.refresh_token;
    const originalRequest = error.config;
    // @ts-ignore
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      // @ts-ignore
      originalRequest._retry = true;
      const { data } = await axios.post(
        baseURL + "/auth/refresh",
        {},
        {
          headers: {
            Authorization: "Bearer " + (refreshToken as string),
          },
        }
      );
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      return apiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);



export { apiInstance as axiosApiInstance };
