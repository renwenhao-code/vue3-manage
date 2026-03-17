<template>
  <div class="header">
    <el-row class="row">
      <el-col class="col" :span="6">
        <el-icon
          class="collapseIcon"
          v-show="!isCollapse"
          @click="handleCollapse"
        >
          <Expand />
        </el-icon>
        <el-icon
          class="collapseIcon"
          v-show="isCollapse"
          @click="handleCollapse"
        >
          <Fold />
        </el-icon>
      </el-col>
      <el-col class="col" :span="6"></el-col>
      <el-col class="col" :span="6"></el-col>
      <el-col class="col" :span="6">
        {{ useUserStore().stateUserInfo.value.name }}
      </el-col>
    </el-row>
  </div>
</template>
 
<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
const emit = defineEmits(["custom-isCollapse"]);
const isCollapse = ref(false);
//自定义事件向父组件传递collapse状态
function handleCollapse() {
  isCollapse.value = !isCollapse.value;
  emit("custom-isCollapse", isCollapse.value);
}
function logout() {
  useUserStore().logout();
}

function getUserInfo() {
  useUserStore().getUserInfo();
}
</script>
 
<style scoped lang="less">
.header {
  line-height: 60px;
  .row {
    .collapseIcon {
      cursor: pointer;
    }
    .col:last-child {
      text-align: right;
    }
  }
}
</style>