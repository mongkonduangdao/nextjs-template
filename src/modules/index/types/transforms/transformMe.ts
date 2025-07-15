import { IMeResponse } from '@/shared/types/api/v1/me'

export interface ITransformMe extends IMeResponse {
  displayName: string
  displayEmail: string
}
