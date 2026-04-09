import request from "@/utils/request";

import type { UserInfo, LoginResponse, ApiResponse } from "@/type";
// 登录
export function userLogin(userInfo: UserInfo): Promise<LoginResponse> {
  return request.post("/user/login", userInfo) as Promise<LoginResponse>;
}
//获取用户列表
export function getInfo(): Promise<ApiResponse<UserInfo>> {
  return request.get("/user/info") as Promise<ApiResponse<UserInfo>>;
}
//获取用户列表
export function getUserList(): Promise<ApiResponse<UserInfo[]>> {
  return request.get("/user/list") as Promise<ApiResponse<UserInfo[]>>;
}
// 删除用户
export function deleteUser(token:string): Promise<ApiResponse<any>> {
  return request.delete("/user/deleteUserByToken", { params: { token } }) as Promise<ApiResponse<any>>;
}
