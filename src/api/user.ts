import request from "@/utils/request";

import type { UserInfo, LoginResponse, ApiResponse } from "@/type";

export function userLogin(userInfo: UserInfo): Promise<LoginResponse> {
  return request.post<LoginResponse, any>(
    "/user/login",
    userInfo,
  ) as Promise<LoginResponse>;
}

export function getInfo(): Promise<ApiResponse<UserInfo>> {
  return request.get<ApiResponse<UserInfo>, any>("/user/info") as Promise<
    ApiResponse<UserInfo>
  >;
}
