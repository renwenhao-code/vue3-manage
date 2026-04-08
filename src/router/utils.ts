import type { RouteRecordRaw } from "vue-router";

import router from "./index";

/**
 * 根据用户角色 过滤权限路由
 * @param routes 动态权限路由表
 * @param roles 用户角色
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    // 拷贝路由对象
    const tmp = { ...route };
    // 判断：是否需要权限校验
    if (tmp.meta?.roles) {
      // 校验：用户角色 是否在 路由允许的角色中
      const hasPermission = roles.some((role) =>
        tmp.meta?.roles?.includes(role),
      );
      if (hasPermission) {
        // 递归过滤子路由
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles);
        }
        res.push(tmp);
      }
    } else {
      // 不需要权限，直接加入
      res.push(tmp);
    }
  });
  return res;
}

// const filteredRoutes = filterAsyncRoutes(asyncRoutes, roles);
// filteredRoutes[0] && router.addRoute(filteredRoutes[0]);
/**
 * 退出时重置路由
 * @param routes 动态权限路由表
 */
export const resetRouter = function (routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    if (route.name && router.hasRoute(route.name)) {
      router.removeRoute(route.name);
    }
  });
};
