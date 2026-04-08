// routes.ts
import type { RouteRecordRaw } from "vue-router";


export const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  
];


export const asyncRoutes: Array<RouteRecordRaw> = [
  // 保持原有路由配置不变
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    meta: { roles: ["admin", "editor", "user"] },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          roles: ["admin", "editor"],
          hidden: true,
        },
      },
      {
        path: "product",
        name: "product",
        component: () => import("@/views/product/index.vue"),
        meta: {
          title: "商品",
          icon: "Goods",
          roles: ["admin", "editor"],
          hidden: false,
        },
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/user/index.vue"),
        meta: {
          title: "用户",
          icon: "user",
          roles: ["admin"],
          hidden: false,
        },
      },
      {
        path: "other",
        name: "other",
        component: () => import("@/views/other/index.vue"),
        meta: {
          title: "其他",
          icon: "List",
          roles: ["admin"],
          hidden: false,
        },
        children: [
          {
            path: "other1",
            name: "other1",
            component: () => import("@/views/other/otherChild1/index.vue"),
            meta: {
              title: "其他1",
              icon: "none",
              roles: ["admin", "editor"],
              hidden: false,
            },
          },
          {
            path: "other2",
            name: "other2",
            component: () => import("@/views/other/otherChild2/index.vue"),
            meta: {
              title: "其他2",
              icon: "none",
              roles: ["admin", "editor"],
              hidden: false,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/404/index.vue"),
    meta: { roles: ["admin", "editor", "user"] },
  },
];



