##UI篇
el-menu 可以启用嵌套式路由
当遍历路由时:index="`/${item.path}`"必须为绝对路径，否者当跳转三级路由时,再次跳转到二级路由就会警告路由错误

##TS声明响应式数据

有两种写法
1:const userName:Ref<string|null>=ref(null)
2:const userName=ref<string|null>(null)

##ES6导入和导出

具名导入和导出
export const count=1
import {count} from "@/type"

默认导入和导出
const num=1
export default num
import num from "@/type"

TS类型
// 定义用户信息
export interface userInfo {
name: string | "";
password: string | "";
}

import type { userInfo } from "@/type";
