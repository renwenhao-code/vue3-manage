import type { RouteRecordRaw } from 'vue-router' // 重点：加 type

import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'layout',
		redirect: '/home',
		component: () => import('@/components/layout/index.vue'),
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					icon: 'HomeFilled',
				},
			},
			{
				path: 'product',
				name: 'product',
				component: () => import('@/views/product/index.vue'),
				meta: {
					title: '商品',
					icon: 'Goods',
				},
			},
			{
				path: 'user',
				name: 'user',
				component: () => import('@/views/user/index.vue'),
				meta: {
					title: '用户',
					icon: 'user',
				},
			},
			{
				path: 'other',
				name: 'other',
				component: () => import('@/views/other/index.vue'),
				meta: {
					title: '其他',
					icon: 'List',
				},
				children: [
					{
						path: 'other1',
						name: 'other1',
						component: () => import('@/views/other/otherChild1/index.vue'),
						meta: {
							title: '其他1',
							icon: 'none',
						},
					},
					{
						path: 'other2',
						name: 'other2',
						component: () => import('@/views/other/otherChild2/index.vue'),
						meta: {
							title: '其他2',
							icon: 'none',
						},
					},
				],
			},
		],

	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import('@/views/404/index.vue'),
	}
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
export default router
