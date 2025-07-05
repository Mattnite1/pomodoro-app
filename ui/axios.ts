import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const axiosBaseConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3333/',
}
const apiInstance = axios.create(axiosBaseConfig)

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers = {
      Authorization: `Bearer ${token as string}`,
      'Content-Type': 'application/json',
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

apiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const refreshToken = localStorage.getItem('refreshToken')
    // const data = loadStorageData(['refresh_token'])
    // const refreshToken = data.refresh_token;
    const originalRequest = error.config
    // @ts-ignore
    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      // @ts-ignore
      originalRequest._retry = true
      // TODO: change to .env
      const { data } = await axios.post(
        'http://localhost:3000/auth/refresh',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + (refreshToken as string),
          },
        },
      )
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      return apiInstance(originalRequest)
    }
    return Promise.reject(error)
  },
)

const setTokens = (token: string, refreshToken: string) => {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
}

const clearTokens = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}

export { apiInstance as axiosApiInstance, setTokens, clearTokens }