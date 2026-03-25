import request from "@/utils/request";

import type { Product } from "@/type";

export function getProducts(): Promise<Product[]> {
  return request.get("/products") as Promise<Product[]>;
}
