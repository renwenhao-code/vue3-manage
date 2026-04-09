<template>
  <el-table :data="userList" class="user-table" v-loading="tableLoading">
    <el-table-column
      prop="avatar"
      label="头像"
      align="center"
      :resizable="true"
      border="true"
      :fit="true"
    >
      <template #default="scope">
        <img
          :src="scope.row.avatar"
          width="80"
          height="80 "
          class="inline-block"
        />
      </template>
    </el-table-column>
    <el-table-column prop="introduction" label="详情" align="center" />
    <el-table-column prop="name" label="用过户名" align="center" />
    <el-table-column prop="roles" label="权限" align="center">
      <template #default="scope">
        <span v-for="role in scope.row.roles" :key="role.index">
          <el-tag type="success">{{ role }}</el-tag>
        </span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.row, scope.$index)"
          :disabled="scope.row.name === currentUserName"
        >
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-button class="mt-4 hidden" style="width: 100%" @click="onAddItem">
    Add Item
  </el-button> -->
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import type { ApiResponse, UserInfo } from "@/type/index";

const now = new Date();

const userStore = useUserStore();

const userList = ref<UserInfo[] | undefined>(undefined);

const tableLoading = ref(true);

onMounted(async () => {
  tableLoading.value = true;
  try {
    const res = (await userStore.storeGetUserList()) as ApiResponse<UserInfo[]>;
    userList.value = res.data;
  } catch (error: string | any) {
    ElMessage.error(error);
  } finally {
    tableLoading.value = false;
  }
});

const deleteRow = async (item: UserInfo,index:number) => {
  if (item.token) {
    await userStore.storeDeleteUser(item.token).then((res) => {
      ElMessage.success((res as ApiResponse<any>).message);
      userList.value?.splice(index, 1);
    });
  }
  // console.log()
};

const onAddItem = () => {
  now.setDate(now.getDate() + 1);
  userList.value?.push({
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    introduction: "new user",
    name: "new user",
    roles: ["admin"],
    password: "123456",
  });
};
//当前帐号用户名
const currentUserName = computed(() => {
  return userStore.stateUserInfo.value?.name;
});
</script>

<style scoped lang="less">
.user-table {
  max-height: calc(-60px + 100vh);
  height: 85vh;
}
</style>
