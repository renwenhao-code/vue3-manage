// permission.ts 最终完美版
import type { Router } from "vue-router";
import { getToken, removeToken } from "@/utils/auth";
import { useUserStore } from "@/stores/user";

import { asyncRoutes } from "./routes";
import { filterAsyncRoutes } from "./utils";

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const token = getToken();
    const userStore = useUserStore();
    const name = userStore.stateUserInfo.value?.name;
    const roles = userStore.stateUserInfo.value?.roles || [];

    
    if (!token) {
      if (to.path === "/login") return;
      return "/login";
    }

    if (to.path === "/login") return "/";

    if (!name) {
      try {
        await userStore.getUserInfo();
      } catch (error) {
        removeToken();
        return `/login?redirect=${to.path}`;
      }
    }

    const hasDynamicRoute = asyncRoutes.some(
      (route) => route.name && router.hasRoute(route.name),
    );

    if (!hasDynamicRoute) {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, roles);
      accessRoutes.forEach((route) => router.addRoute(route));
       return { path: to.fullPath, replace: true };
    }

    return;
  });
}
