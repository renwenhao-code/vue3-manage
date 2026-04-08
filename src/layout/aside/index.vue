<template>
  <div class="aside">
    <div class="aside-title" :style="{ width: isCollapse ? '64px' : '200px' }">
      后台管理系统
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical"
      :default-active="route.path"
      text-color="skyblue"
      :collapse="isCollapse"
      :router="true"
    >
      <template v-for="item in menus" :key="item.path">
        <el-menu-item v-if="!item.children" :index="`/${item.path}`">
          <el-icon>
            <component :is="item.meta?.icon || 'Location'" />
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </el-menu-item>
        <el-sub-menu v-else :key="item.path" :index="`/${item.path}`">
          <template #title>
            <el-icon>
              <component :is="item.meta?.icon || 'Location'" />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="`/${item.path}/${child.path}`"
          >
            <template #title>
              <el-icon>
                <component :is="child.meta?.icon || 'Location'" />
              </el-icon>
              <span>{{ child.meta?.title }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive ,computed} from "vue";
import { useRouter, useRoute } from "vue-router";

// 定义props
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();
const route = useRoute();
const menus = computed(() => {
  const layoutRoute = router.getRoutes().find(item => item.name === 'layout');
  return layoutRoute?.children || [];
});

onMounted(() => {});
</script>

<style lang="less" scoped>
.aside {
  background-color: #545c64;
  
  .aside-title {
    padding-top: 15px;
    transition: 0.5s width;
    color: white;
    text-align: center;
  }
  .el-menu-vertical {
    border: none;
    height: 100%;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
