// src/global.d.ts
import { GlobalComponents } from "element-plus";

import "vue-router";

declare module "vue" {
  export interface GlobalComponents extends GlobalComponents {}
}

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    icon?: string;
    roles?: string[];
    hidden?: boolean;
  }
}
