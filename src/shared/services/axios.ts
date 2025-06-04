import axios from 'axios'

import { setupAxiosInterceptors } from './interceptor'

const axiosInstance = setupAxiosInterceptors(
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}` || '',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
)

export default axiosInstance
