import request from "@/utils/request";

import type { Brand, ApiResponse, BrandList } from "@/type";

export function getBrands(): Promise<ApiResponse<BrandList>> {
  console.log("正在获取品牌数据...");
  return request.get("/brands") as Promise<ApiResponse<BrandList>>;
}
