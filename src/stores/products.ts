import { getProducts, deleteProduct } from "@/api/products";
import type { Product } from "@/type";
import { ref } from "vue";

const products = ref<Product[]>([]);

const getProductsList = async () => {
  const res = await getProducts();
  if (res.code === 200) {
    products.value = res.data;
    console.log(products.value);
  }else{
    console.log(res.message);
  }
};

export  function useProductsStore() {
  return {
    products,
    getProductsList,
    // deleteProduct,
  };
}
