import { ref, computed } from "vue";

import { userLogin, getInfo } from "@/api/user";

import type { UserInfo, LoginResponse } from "@/type";

import { getToken, setToken, removeToken } from "@/utils/auth";
import router from "@/router";

let stateUserInfo = ref<UserInfo | null>(null);
let token = ref<string | null>(getToken() || null);

async function login(userInfo: UserInfo) {
  try {
    const response = await userLogin(userInfo); // 登录成功，保存token
    const { token: loginToken, userInfo: loginUserInfo } = response.data;
    token.value = loginToken;
    stateUserInfo.value = loginUserInfo;
    setToken(token.value); // 将token保存到cookie
    return response;
  } catch (error) {
    throw error;
  }
}

async function getUserInfo() {
  try {
    const response = await getInfo(); // 获取用户信息
    stateUserInfo.value = response.data;
    return response;
  } catch (error) {
    throw error;
  }
}

function logout() {
  token.value = null;
  stateUserInfo.value = null;
  removeToken(); // 移除的token
  router.push("/login"); // 跳转到登录页
}

export function useUserStore() {
  return {
    stateUserInfo,
    token,
    login,
    getUserInfo,
    logout,
  };
}
