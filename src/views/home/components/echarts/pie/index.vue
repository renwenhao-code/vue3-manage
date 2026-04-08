<template>
    <div ref="chartRef" class="chart"></div>
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

const seriesData = computed(() => {
  return annualsales.value?.map((item, index) => ({
    value: item,
    name: names.value[index],
  }));
});

// 定义图表容器的引用
const chartRef = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  // 创建ECharts实例
  chartInstance = echarts.init(chartRef.value);

  // 配置饼图选项
  const option = {
    title: {
      text: "全年销售数据分布",
      subtext: "2025年度",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "销售数据",
        type: "pie",
        radius: "50%",
        data: seriesData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // 应用配置
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
  window.addEventListener("resize", handleResize);
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>


.chart {
  width: 100%;
  height: 100%;
}
</style>
