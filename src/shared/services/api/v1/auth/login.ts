import { AxiosResponse } from 'axios'

import axiosInstance from '@/shared/services/axios'
import REQUEST_URL from '@/shared/services/requestUrl'

export const postLogin = async <TResponse, TPayload>(payload: TPayload) => {
  const response = await axiosInstance.post<TResponse, AxiosResponse<TResponse>>(REQUEST_URL.v1.auth.login, payload, {
    requiredAuth: false,
  })
  return response.data
}
