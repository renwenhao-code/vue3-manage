import Mock from "mockjs";

import { users } from "./user";

// 定义商品接口
interface Product {
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

// 商品分类列表
const categories = [
  "电子产品",
  "服装鞋帽",
  "食品饮料",
  "家居用品",
  "图书文具",
  "运动户外",
];

// 生成单个商品数据
const generateProduct = (): Product => {
  const price = Mock.Random.float(10, 1000, 2, 2);
  return {
    id: Mock.Random.guid(),
    name: Mock.Random.ctitle(4),
    price: price,
    originalPrice: Mock.Random.float(price, price * 1.5, 2, 2),
    stock: Mock.Random.integer(0, 1000),
    category: Mock.Random.pick(categories),
    description: Mock.Random.cparagraph(1),
    image: `https://picsum.photos/200/200?random=${Mock.Random.integer(1, 1000)}`,
    rating: Mock.Random.float(1, 5, 1, 1),
    sales: Mock.Random.integer(0, 10000),
    createTime: Mock.Random.datetime("yyyy-MM-dd HH:mm:ss"),
  };
};

// 生成商品列表
const generateProductList = (count: number = 100): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push(generateProduct());
  }
  return products;
};

// 将mock api统一暴露出去
const productsMock: Array<{ url: string; method: string; response: any }> = [
  {
    url: "/api/products",
    method: "GET",
    response: (config: any) => {
      const token = config.headers?.Authorization;
      if (users.has(token)) {
        return [
          200,
          {
            code: 200,
            message: "获取商品列表成功",
            data: generateProductList(),
          },
        ];
      } else {
        return [
          400,
          {
            code: 400,
            message: "获取商品列表失败",
          },
        ];
      }
    },
  },
];

export default productsMock;
