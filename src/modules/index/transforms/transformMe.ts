import { ITransformMe } from '../types/transforms/transformMe'

import { IMeResponse } from '@/shared/types/api/v1/me'

export const transformMe = (data: IMeResponse): ITransformMe => ({
  ...data,
  displayName: data?.user.name ?? '',
  displayEmail: data?.user.email ?? '',
})
