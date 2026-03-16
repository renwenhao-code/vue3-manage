import { defineStore } from "pinia";
import axios from "axios";
import { ref, Ref } from "vue";

// 引入TS类型接口文件
import type { UserInfo, LoginResponse } from "@/type";

import { setToken, getToken, removeToken } from "@/utils/auth";

import router from "@/router";

/**
 * 用户状态管理store
 * 使用Pinia进行状态管理，处理用户登录状态、token等信息
 */
export const useUserStore = defineStore("user", () => {
  // 用户信息 可能为null
  let userInfo = ref<UserInfo | null>(
    JSON.parse(localStorage.getItem("userInfo") || "{}"),
  );
  // token 可能为null
  let token = ref<string | null>(getToken());
  // 登录接口
  async function login(userInfoParams: UserInfo): Promise<LoginResponse> {
    const res = await axios.post("/api/login", userInfoParams);
    // 获取返回的userInfo和token
    const { userInfo: newUserInfo, token: newToken } = res.data.data;

    token.value = newToken;

    userInfo.value = newUserInfo;
    // 将token存入本地
    if (token.value) {
      setToken(token.value);
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
    }
    return res.data;
  }

  function logout() {
    token.value = null;
    userInfo.value = null;
    removeToken();
    router.push("/login");
  }

  return {
    userInfo,
    token,
    login,
    logout,
    
  };
});
