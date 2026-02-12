import { watch, onUnmounted } from 'vue'
import type { Ref } from 'vue'

/**
 * 锁定/解锁页面滚动的 Composable
 * 用于弹窗打开时禁用背景滚动
 * 
 * @param isLocked - 控制是否锁定滚动的响应式变量
 */
export function useLockScroll(isLocked: Ref<boolean>) {
  let scrollbarWidth = 0
  let scrollY = 0

  // 监听锁定状态变化
  watch(isLocked, (locked) => {
    if (locked) {
      // 计算滚动条宽度（在隐藏滚动条之前）
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // 保存当前滚动位置
      scrollY = window.scrollY
      
      // 锁定body滚动
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      
      // 添加padding来补偿滚动条宽度，防止布局抖动
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
        
        // 同时给所有固定定位的元素添加padding补偿
        const fixedElements = document.querySelectorAll('header, .header, [style*="position: fixed"], [style*="position:fixed"]')
        fixedElements.forEach((el) => {
          const element = el as HTMLElement
          const currentPadding = parseInt(window.getComputedStyle(element).paddingRight) || 0
          element.style.paddingRight = `${currentPadding + scrollbarWidth}px`
          element.setAttribute('data-original-padding', currentPadding.toString())
        })
      }
    } else {
      // 恢复滚动位置
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      
      // 恢复固定定位元素的padding
      if (scrollbarWidth > 0) {
        const fixedElements = document.querySelectorAll('[data-original-padding]')
        fixedElements.forEach((el) => {
          const element = el as HTMLElement
          const originalPadding = element.getAttribute('data-original-padding')
          if (originalPadding) {
            element.style.paddingRight = originalPadding === '0' ? '' : `${originalPadding}px`
            element.removeAttribute('data-original-padding')
          }
        })
      }
      
      // 恢复滚动位置
      window.scrollTo(0, scrollY)
      
      // 重置变量
      scrollbarWidth = 0
      scrollY = 0
    }
  }, { immediate: true })

  // 组件卸载时确保恢复滚动
  onUnmounted(() => {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    
    // 清理固定定位元素的padding
    const fixedElements = document.querySelectorAll('[data-original-padding]')
    fixedElements.forEach((el) => {
      const element = el as HTMLElement
      const originalPadding = element.getAttribute('data-original-padding')
      if (originalPadding) {
        element.style.paddingRight = originalPadding === '0' ? '' : `${originalPadding}px`
        element.removeAttribute('data-original-padding')
      }
    })
  })
}
