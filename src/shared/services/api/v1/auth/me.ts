import { AxiosResponse } from 'axios'

import axiosInstance from '@/shared/services/axios'
import REQUEST_URL from '@/shared/services/requestUrl'

export const getMe = async <TResponse, TParams = void>(params?: TParams) => {
  const response = await axiosInstance.get<TResponse, AxiosResponse<TResponse>, TParams>(REQUEST_URL.v1.auth.me, {
    params,
  })
  return response.data
}
