import { createRouter, createWebHashHistory } from "vue-router";

import { setupRouterGuard } from "./permission";

import { publicRoutes, asyncRoutes } from "./routes";






const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});



setupRouterGuard(router);
export default router;
