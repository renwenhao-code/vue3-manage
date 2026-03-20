<template>
  <div class="login">
    <div class="login-card">
      <h1>Login</h1>
      <el-form class="login-form" :model="loginInfo">
        <el-form-item
          class="user-name"
          size="large"
          label="用户名:"
          label-position="top"
        >
          <el-input size="large" v-model="loginInfo.name"></el-input>
        </el-form-item>
        <el-form-item
          class="user-password"
          size="large"
          label="密码:"
          label-position="top"
        >
          <el-input size="large" v-model="loginInfo.password"></el-input>
        </el-form-item>
        <el-form-item class="user-related">
          <el-row>
            <el-checkbox> 记住密码 </el-checkbox>
            <a href="#">没有账号？立即注册</a>
          </el-row>
        </el-form-item>

        <el-form-item class="login-btn-content">
          <el-button
            class="login-btn"
            type="primary"
            size="large"
            @click="submit"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

import type { UserInfo, LoginResponse } from "@/type";
const loginInfo = reactive({
  name: "editor",
  password: "1234567",
});

const router = useRouter();

async function submit() {
  try {
    const userStore = useUserStore();
    let res = await userStore.login(loginInfo);
    if (res && res.code === 200) {
      router.push("/");
    }
    // router.push("/");
  } catch (error) {
    console.error("登录失败:", error);
  }
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  background: url("@/assets/images/login.avif") no-repeat center center;
    // background-color: #2a5c8a; 
  background-size: cover;

  /* 毛玻璃登录框 */
  .login-card {
    padding: 40px;
    width: 450px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h1 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 42px;
      font-weight: 600;
    }
  }
}
</style>

<style  scoped lang="less">
:deep(.login-form) {
  .el-form-item__label {
    color: #fff;
  }
  .el-checkbox__label {
    color: #fff;
  }
  .user-related {
    color: #fff;

    .el-form-item__content {
      width: 100%;
      .el-row {
        justify-content: space-between;
        width: 100%;
      }
    }
  }
  .login-btn-content {
    justify-content: center;
    .el-form-item__content {
      flex: none;
      .el-button {
        padding: 20px;
        width: 150px;
        font-size: 20px;
      }
    }
  }
}
</style>