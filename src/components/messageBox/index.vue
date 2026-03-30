/**************************** CodeGeeX Inline Diff ****************************/
<template>
  <div class="message-box-container">
    <el-button type="primary" @click="showMessageBox">显示可拖拽消息框</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessageBox } from 'element-plus'

// 自定义拖拽指令
const vDraggable = {
  mounted(el) {
    const header = el.querySelector('.el-message-box__header')
    if (!header) return
    
    header.style.cursor = 'move'
    
    let isDragging = false
    let startX, startY, initialLeft, initialTop
    
    const onMouseDown = (e) => {
      isDragging = true
      startX = e.clientX
      startY = e.clientY
      
      const rect = el.getBoundingClientRect()
      initialLeft = rect.left
      initialTop = rect.top
      
      // 添加鼠标移动和释放事件监听
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
    
    const onMouseMove = (e) => {
      if (!isDragging) return
      
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      
      el.style.position = 'fixed'
      el.style.left = `${initialLeft + dx}px`
      el.style.top = `${initialTop + dy}px`
      el.style.margin = '0' // 清除默认margin
    }
    
    const onMouseUp = () => {
      isDragging = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    
    header.addEventListener('mousedown', onMouseDown)
  }
}

// 显示消息框的方法
const showMessageBox = () => {
  ElMessageBox({
    title: '可拖拽消息框',
    message: '这是一个可拖拽的消息框，按住标题栏可以拖动它。',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showClose: true,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    customClass: 'draggable-message-box',
    beforeClose: (action, instance, done) => {
      done()
    }
  }).then(() => {
    // 确定按钮点击后的回调
    console.log('点击了确定按钮')
  }).catch(() => {
    // 取消按钮或关闭按钮点击后的回调
    console.log('点击了取消或关闭按钮')
  })
}

// 组件挂载后，为消息框添加拖拽功能
onMounted(() => {
  // 监听DOM变化，当消息框出现时应用拖拽指令
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('draggable-message-box')) {
            // 应用拖拽指令
            vDraggable.mounted(node)
          }
        })
      }
    })
  })
  
  // 开始观察document.body的变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  // 组件卸载时停止观察
  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped>
.message-box-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 自定义消息框样式 */
:deep(.draggable-message-box) {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 消息框标题栏样式 */
:deep(.draggable-message-box .el-message-box__header) {
  cursor: move;
  user-select: none;
}
</style>
/******************** 7c9f5a5f-cf1e-44a5-9a40-73d03c719d83 ********************/
