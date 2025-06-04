import { AxiosResponse } from 'axios'

import axiosInstance from '@/shared/services/axios'
import REQUEST_URL from '@/shared/services/requestUrl'
import { MeResponse } from '@/shared/types/api/v1/me'

export const getMe = async () => {
  const response = await axiosInstance.get<MeResponse, AxiosResponse<MeResponse>>(REQUEST_URL.v1.me.get, {
    requiredAuth: true,
  })
  return response.data
}
