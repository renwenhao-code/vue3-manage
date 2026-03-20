<<<<<<< HEAD
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    // port: 3000, // 设置端口号
    open: true, // 自动打开浏览器
    
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000", // 代理目标地址
    //   },
    // },
  },
});
=======
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
})
>>>>>>> c228ba488b0d9552c7761dd7e20fa58c7be002eb
