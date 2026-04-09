import request from "@/utils/request";

import type { Brand, ApiResponse, BrandList } from "@/type";

export function getBrands(): Promise<ApiResponse<Brand[]>> {
  return request.get("/brands") as Promise<ApiResponse<Brand[]>>;
}
