import { useQuery } from '@tanstack/react-query'

import { getMe } from '@/shared/services/api/v1/auth/me'
import REQUEST_URL from '@/shared/services/requestUrl'
import { IMeParams, IMeResponse } from '@/shared/types/api/v1/me'

type UseGetMeOptions<TSelect> = {
  params?: IMeParams
  enabled?: boolean
  select?: (data: IMeResponse) => TSelect
}

export const useGetMe = <TSelect = IMeResponse>(options?: UseGetMeOptions<TSelect>) => {
  const { enabled, select, params } = options ?? {}
  return useQuery<IMeResponse, Error, TSelect>({
    queryKey: [REQUEST_URL.v1.auth.me, params],
    queryFn: () => getMe<IMeResponse, IMeParams>(params),
    select,
    enabled,
    staleTime: 1000 * 60 * 5,
  })
}
