<!-- BaseButton.vue -->
<template>
  <el-button
    :loading="loading"
    :disabled="loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'click', done: () => void): void
}>()

const loading = ref(false)

const handleClick = () => {
  if (loading.value) return
  loading.value = true
  // 定义 done 回调，由父组件在异步操作完成后调用
  const done = ():void => {
    loading.value = false
  }
  emit('click', done)
}
</script>