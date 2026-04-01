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

在使用mock模拟数据时，优先使用静态导入，优先执行mock文件，如果不这样当页面刷新时mock将拦截不到路由发送的请求导致返回的是项目打包后的入口文件
import "../mock";

##错误捕获

1. try/catch 无法捕获业务状态码错误
   场景：在 getUserInfo 函数中，使用 try/catch 包裹 await getInfo()，但后端返回 code !== 200 时，请求本身成功（Promise resolved），不会触发 catch。
   原因：try/catch 只能捕获 Promise 被 reject 的错误或同步抛出的错误；业务状态码需要手动判断。

此时可以在request拦截器中处理
request.interceptors.response.use(
(response) => {
// 对响应数据做点什么
if (response.data.code === 200) {
return response.data;
} else {
return Promise.reject(response.data.message || "请求失败");
}
},
(error) => {
// 对响应错误做点什么
return Promise.reject(error);
},
);

##通过ref操作子组件中的属性和方法

//父组件
<template>

  <div>
    <Child ref="childRef" />
    <button @click="changeChild">改变子组件的值</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Child from "./Child.vue";

const childRef = ref(null);

const changeChild = () => {
  childRef.value.changeChildValue();
};
</script>

//子组件
<template>

  <div>
    <p>{{ childValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";

const childValue = ref("子组件的值");

function changeChildValue(){
  console.log("子组件的方法");
}
//暴露出子组件的方法和属性
defineExpose({
  changeChildValue,
});
</script>
##组件间通信
使用自定义事件时子组件要定义
const emit=defineEmits(["自定义事件属性名",""])
父组件使用时
<Child @自定义事件属性名="父组件方法" />


