import { computed } from "vue";

import type { BrandList, Brand } from "@/type";


export function useBrandData(props: { tableData: Brand[] }) {
  
  const names = computed(() => {
    return props.tableData.map((item) => item.name);
  });
  // 计算出日销量数组
  const dailysales = computed(() => {
    return props.tableData.map((item) => item.dailySales);
  });
  // 计算出月销量数组
  const monthlysales = computed(() => {
    return props.tableData.map((item) => item.monthlySales);
  });
  // 计算出年销量数组
  const annualsales = computed(() => {
    return props.tableData.map((item) => item.annualSales);
  });
  return {
    names,
    dailysales,
    monthlysales,
    annualsales,
  }
}
