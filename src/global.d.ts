// src/global.d.ts
import { GlobalComponents } from "element-plus";

declare module "vue" {
  export interface GlobalComponents extends GlobalComponents {}
}
