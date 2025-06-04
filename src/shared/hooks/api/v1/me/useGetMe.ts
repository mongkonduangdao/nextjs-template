import { useQuery } from '@tanstack/react-query'

import { getMe } from '@/shared/services/api/v1/me'
import REQUEST_URL from '@/shared/services/requestUrl'

export const useGetMe = () => {
  return useQuery({
    queryKey: [REQUEST_URL.v1.me.get],
    queryFn: getMe,
  })
}
