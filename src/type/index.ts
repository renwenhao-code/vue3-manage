// @/type.ts
// 定义用户信息接口
export interface UserInfo {
  name: string;
  password: string;
  roles?: string[];
  introduction?: string;
  avatar?: string;
}
// 定义登录接口的响应类型
export interface LoginResponse {
  code: number;
  data: {
    token: string;
    userInfo: UserInfo;
  };
  message: string;
}

// 定义一个通用的API响应类型，包含一个泛型参数T表示data的类型
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
