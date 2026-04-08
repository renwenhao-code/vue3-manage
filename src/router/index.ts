import { createRouter, createWebHistory } from "vue-router";

import { setupRouterGuard } from "./permission";

import { publicRoutes, asyncRoutes } from "./routes";






const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes,
});



setupRouterGuard(router);
export default router;
