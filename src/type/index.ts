// 定义用户信息
export interface UserInfo {
  name: string | "";
  password: string | "";
}
// 定义相应类型
export interface LoginResponse {
  code: number;
  message: string;
  data: UserInfo;
}
