<template>
  <div class="chart-container">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import * as echarts from "echarts";

import { useBrandData } from "@/composables/brands";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
});
const { names, dailysales, monthlysales, annualsales } = useBrandData(props);


// 创建图表容器的引用
const chartRef = ref(null);
// 存储ECharts实例
let chartInstance = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  // 创建ECharts实例
  chartInstance = echarts.init(chartRef.value);
  

  // 配置图表选项
  const option = {
    title: {
      text: "销量折线图",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["日销量", "月销量", "年销量"],
      bottom: 10,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: names.value,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "日销量",
        type: "line",
        data: dailysales.value,
        smooth: true,
        itemStyle: {
          color: "#5470c6",
        },
      },
      {
        name: "月销量",
        type: "line",
        data: monthlysales.value,
        smooth: true,
        itemStyle: {
          color: "#91cc75",
        },
      },
      {
        name: "年销量",
        type: "line",
        data: annualsales.value,
        smooth: true,
        itemStyle: {
          color: "pink",
        },
      },
    ],
  };

  // 设置图表选项
  chartInstance.setOption(option);
};

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

// 组件挂载后初始化图表
onMounted(() => {
  initChart();
  // 添加窗口大小变化监听
  window.addEventListener("resize", handleResize);
});

// 组件卸载前销毁图表实例
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  // 移除窗口大小变化监听
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 310px;
  padding: 20px;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
