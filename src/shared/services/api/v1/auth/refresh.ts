import axiosInstance from "@/shared/services/axios";
import REQUEST_URL from "@/shared/services/requestUrl";
import { AxiosResponse } from "axios";

interface RefreshTokenResponse {
  accessToken: string;
  newRefreshToken: string;
}

interface RefreshTokenRequest {
  accessToken: string;
}

export const getRefreshToken = async (payload: RefreshTokenRequest) => {
  const response = await axiosInstance.post<
    RefreshTokenResponse,
    AxiosResponse<RefreshTokenResponse>
  >(REQUEST_URL.v1.auth.refresh, payload, { requiredAuth: false });
  return response.data;
};

