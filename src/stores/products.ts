import { getProducts, deleteProduct, editProduct } from "@/api/products";
import type { Product } from "@/type";
import { ElMessage, ElMessageBox } from "element-plus";

import { ref } from "vue";

const products = ref<Product[] | undefined>([]);

/**
 * 获取产品列表的异步函数
 * 使用Promise封装异步操作，处理获取产品列表的请求
 * @returns {Promise} 返回一个Promise对象，解析为获取到的产品数据
 */
const storeGetProductsList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // 发起获取产品的异步请求
      const res = await getProducts();
      // 将获取到的产品数据赋值给products响应式变量
      products.value = res.data;
      // 请求成功，解析Promise并返回响应数据
      resolve(res);
    } catch (error: any) {
      // 请求失败，拒绝Promise并返回错误信息
      reject(error);
    }
  });
};

/**
 * 根据ID删除产品的异步函数
 * @param id - 要删除的产品ID
 * @returns 返回一个Promise，解析为删除操作的结果
 */
const storeDeleteProductById = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    // 创建一个新的Promise对象来处理异步操作
    try {
      const res = await deleteProduct(id); // 调用删除产品的API函数
      resolve(res); // 如果成功，解析Promise并返回结果
    } catch (error: any) {
      // 捕获可能发生的错误
      reject(error); // 如果发生错误，拒绝Promise并返回错误
    }
  });
};

/**
 * 编辑产品信息的异步函数
 * @param product - 包含产品信息的对象
 * @returns 返回一个Promise，解析为编辑操作的结果
 */
const storeEditProduct = (product: Product) => {
  return new Promise(async (resolve, reject) => {
    // 创建一个新的Promise对象来处理异步操作
    try {
      const res = await editProduct(product); // 调用删除产品的API函数
      resolve(res); // 如果成功，解析Promise并返回结果
    } catch (error: any) {
      // 捕获可能发生的错误
      reject(error); // 如果发生错误，拒绝Promise并返回错误
    }
  });
};

export function useProductsStore() {
  return {
    products,
    storeGetProductsList,
    storeDeleteProductById,
    storeEditProduct,
  };
}
