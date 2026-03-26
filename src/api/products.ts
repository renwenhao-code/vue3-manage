import request from "@/utils/request";

import type { ApiResponse, Product } from "@/type";

export function getProducts(): Promise<ApiResponse<Product[]>> {
  return request.get("/products") as Promise<ApiResponse<Product[]>>;
}

export function deleteProduct(id: string): Promise<ApiResponse<any>> {
  return request.delete(`/products/deleteById`, { params: { id } }) as Promise<
    ApiResponse<any>
  >;
}
