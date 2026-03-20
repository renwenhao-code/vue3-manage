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
        <el-dropdown trigger="click" >
          <span class="el-dropdown-link">
            <el-avatar
              :size="44"
              :src="useUserStore().stateUserInfo.value?.avatar"
              :title="useUserStore().stateUserInfo.value?.name"
            >
              {{ useUserStore().stateUserInfo.value?.name?.charAt(0) }}
            </el-avatar>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
      
      .el-dropdown{
        vertical-align: middle;
        line-height: 1.5;
      }
    }
  }
}
</style>