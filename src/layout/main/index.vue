<template>
  <div>
    <!-- <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view> -->
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped>
/* 动画持续时间、过渡效果 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
/* 入场开始状态（初始位置） */
.slide-enter-from {
  /* opacity: 0; */
  transform: translateX(-20px);
}
/* 离场结束状态 */
.slide-leave-to {
  /* opacity: 1; */
  transform: translateX(20px);
}
</style>
