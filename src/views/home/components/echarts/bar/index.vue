<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

import { useBrandData } from "@/composables/brands";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
});
const { names, dailysales, monthlysales, annualsales } = useBrandData(props);

const chartRef = ref(null);
let chartInstance = null;

const option = {
  title: {
    text: "年月日销量柱状图",
  },
  tooltip: {},
  xAxis: {
    data: names.value,
  },
  yAxis: {},
  series: [
    {
      name: "日销量",
      type: "bar",
      data: dailysales.value,
    },
    {
      name: "月销量",
      type: "bar",
      data: monthlysales.value,
    },
    {
      name: "年销量",
      type: "bar",
      data: annualsales.value,
    },
  ],
};

onMounted(() => {
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(option);
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  if (chartInstance) {
    chartInstance.dispose();
  }
});

function resizeChart() {
  if (chartInstance) {
    chartInstance.resize();
  }
}
</script>