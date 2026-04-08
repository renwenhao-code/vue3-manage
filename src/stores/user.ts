import { ref, computed } from "vue";

import { userLogin, getInfo } from "@/api/user";

import type { UserInfo, LoginResponse } from "@/type";

import { getToken, setToken, removeToken } from "@/utils/auth";
import router from "@/router";

let stateUserInfo = ref<UserInfo | null | undefined>(null);
let token = ref<string | null>(getToken() || null);

/**
 * 登录函数
 * @param {UserInfo} userInfo - 用户信息对象，包含登录所需的用户名和密码等
 * @returns {Promise} - 返回一个Promise对象，用于处理登录操作的异步结果
 */
 function login(userInfo: UserInfo) {
  return new Promise( async(resolve, reject) => {
    try {
      // 调用登录API，传入用户信息
      const response = await userLogin(userInfo); // 登录成功，保存token
      // 从响应数据中解构出token和用户信息
      const { token: loginToken, userInfo: loginUserInfo } = response.data;
      // 将token保存到状态管理中
      token.value = loginToken;
      // 将用户信息保存到状态管理中
      stateUserInfo.value = loginUserInfo;
      setToken(token.value); // 将token保存到cookie
      
      // 登录成功， resolve响应数据
      resolve(response);
    } catch (error) {
      // 登录失败， reject错误信息
      reject(error);
    }
  });
}

/**
 * 获取用户信息的方法
 * @returns {Promise} 返回一个Promise对象，用于异步获取用户信息
 */
 function getUserInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getInfo(); // 获取用户信息
      stateUserInfo.value = response.data;
      localStorage.setItem(
        "roles",
        JSON.stringify(stateUserInfo.value?.roles),
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

function logout() {
  token.value = null;
  stateUserInfo.value = null;
  removeToken(); // 移除的token
  localStorage.removeItem("roles"); // 移除roles
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
