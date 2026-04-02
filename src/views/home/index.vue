<template>
  <div class="home-content">
    <!-- 上部分：左中右三列布局 -->
    <el-row :gutter="10">
      <el-col :span="8">
        <el-row :gutter="10" class="user-info-column">
          <el-col :span="8">
            <div class="grid-content">
              <el-card shadow="always">
                <template #header>
                  <div>
                    <div class="flex flex-row gap-x-5 justify-center">
                      <!-- class="text-center" -->
                      <div>
                        <img
                          class="w-18 h-18 rounded-full inline-block"
                          :src="userInfo?.avatar"
                        />
                      </div>
                      <div class="flex flex-col gap-y-4 justify-center">
                        <p class="text-xs text-left font-bold">
                          {{ userInfo?.name }}
                        </p>
                        <p class="text-xs text-left">
                          {{ userInfo?.introduction }}
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="">
                  <p class="text-left text-sm">上次登陆时间：14点13分</p>
                  <p class="text-left text-sm">上次登录地点：北京市朝阳区</p>
                </div>
              </el-card>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="grid-content">
              <el-card>
                <el-table :data="tableData" style="width: 100%" height="100%">
                  <el-table-column align="center" prop="name" label="品牌" />
                  <el-table-column
                    align="center"
                    prop="dailySales"
                    label="今日销量"
                  />
                  <el-table-column
                    align="center"
                    prop="monthlySales"
                    label="本月销量"
                  />
                  <el-table-column
                    align="center"
                    prop="annualSales"
                    label="年销量"
                  />
                </el-table>
              </el-card>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="grid-content">
              <el-card>
                <Pie
                v-if="tableData?.length"
                  :tableData="tableData"
                />
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="grid-content">
              <el-card>
                <div class="flex justify-around flex-wrap items-center">
                  <div class="w-16 h-16">
                    <img
                      class="rounded-full"
                      src="@/assets/home/D.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p>￥{{ dailyTotalSales }}</p>
                    <p>日总销量</p>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-card>
                <div class="flex justify-around flex-wrap items-center">
                  <div class="w-16 h-16">
                    <img
                      class="rounded-full"
                      src="@/assets/home/M.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p>￥{{ monthlyTotalSales }}</p>
                    <p>月总销量</p>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-card>
                <div class="flex justify-around flex-wrap items-center">
                  <div class="w-16 h-16">
                    <img
                      class="rounded-full"
                      src="@/assets/home/T.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p>￥{{ annualTotalSales }}</p>
                    <p>年总销量</p>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <div class="grid-content">
              <el-card>
                <Line
                 v-if="tableData?.length"
                  :tableData="tableData"
                />
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="grid-content">
              <el-card>
                <Bar
                 v-if="tableData?.length"
                  :tableData="tableData"
                />
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

import Line from "@/components/echarts/line/index.vue";
import Pie from "@/components/echarts/pie/index.vue";
import Bar from "@/components/echarts/bar/index.vue";

import { getBrands } from "@/api/brands";

import type { Brand,BrandList, ApiResponse } from "@/type";

// 使用用户信息的store
const userStore = useUserStore();

// 定义表格数据的响应式变量，初始值为一个空的品牌列表对象
const tableData = ref<Brand[]|undefined>(undefined);
// const tableData = ref<BrandList | undefined>(undefined);

//页面挂载完毕后获取品牌数据
onMounted(async () => {
  try {
    const response = await getBrands();
    tableData.value = response.data;
  } catch (error: string | any) {
    console.error("获取品牌数据失败：", error);
  }
});

// 使用计算属性获取用户信息
const userInfo = computed(() => {
  return userStore.stateUserInfo.value;
});

// 计算属性：计算所有品牌的日销量总和
const dailyTotalSales = computed(() => {
  return tableData.value?.reduce((total: number, brand: Brand) => total + brand.dailySales, 0);
});

// 计算属性：计算所有品牌的月销量总和
const monthlyTotalSales = computed(() => {
  return tableData.value?.reduce(
    (total: number, brand: Brand) => total + brand.monthlySales,
    0,
  );
});

// 计算属性：计算所有品牌的年销量总和
const annualTotalSales = computed(() => {
  return tableData.value?.reduce(
    (total: number, brand: Brand) => total + brand.annualSales,
    0,
  );
});
</script>

<style scoped lang="less">
.home-content {
  overflow-y: scroll;
  height: 100vh;
  min-width: 1190px;
}
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: #d3dce6;
  padding: 10px;
  text-align: center;
}
.user-info-column {
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 0;
  .el-col {
    max-width: 100%;
  }
}
</style>
