<template>
  <el-container class="layout-container">
    <!-- <el-aside class="aside"> -->
      <Aside :isCollapse="isCollapse"/>
    <!-- </el-aside> -->

    <el-container class="layout-container-right">
      <el-header class="header">
        <Header  @custom-isCollapse="customIsCollapse" />
      </el-header>

      <el-main class="main">
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Header from "./header/index.vue";
import Aside from "./aside/index.vue";
import Main from "./main/index.vue";
// 父组件接收子组件的状态并向aside传递collapse的状态
const isCollapse = ref(false);
function customIsCollapse(e) {
  isCollapse.value = e;
}
</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
  .aside{
    background-color:#545c64;
  }
  .layout-container-right{
     height: 100vh;
    background-color: #dadada;
    .header{
      border-bottom: 1px solid #e6e6e6;
    }
    .main{
      
      // background-color: pink;
    }
  }
}
</style>
