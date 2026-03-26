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
  data?: T;
  message: string;
}

// 定义品牌信息接口
export interface Brand {
  name: string;
  dailySales: number;
  monthlySales: number;
  annualSales: number;
}


// 定义品牌列表接口
export interface BrandList {
  brands: Brand[];
}





//定义商品列表接口

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  sales: number;
  createTime: string;
}