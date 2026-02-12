<template>
  <div class="floating-actions">
    <button class="floating-btn" :class="{ active: isStarred }" @click="toggleStar" title="收藏">
      <i class="bi bi-star-fill"></i>
    </button>
    <button class="floating-btn" :class="{ active: isLiked }" @click="toggleLike" title="点赞">
      <i class="bi bi-heart-fill"></i>
    </button>
    <button class="floating-btn" title="观看人数">
      <i class="bi bi-eye-fill"></i>
    </button>
    <button class="floating-btn" @click="scrollToTop" title="返回顶部">
      <svg class="back-to-top-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M755.9 457.55L540.49 242.14c-13.67-13.67-35.83-13.67-49.5 0L275.03 458.11c-13.67 13.67-13.67 35.83 0 49.5 6.83 6.83 15.79 10.25 24.75 10.25s17.91-3.42 24.75-10.25l155.94-155.94V930c0 19.33 15.67 35 35 35s35-15.67 35-35V351.11l155.94 155.94c13.67 13.67 35.83 13.67 49.5 0 13.66-13.67 13.66-35.83-0.01-49.5zM907 145.26H123.93c-19.33 0-35-15.67-35-35s15.67-35 35-35H907c19.33 0 35 15.67 35 35s-15.67 35-35 35z" fill="currentColor"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isStarred = ref(false)
const isLiked = ref(false)

const toggleStar = () => {
  isStarred.value = !isStarred.value
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.floating-actions {
  position: fixed;
  right: clamp(16px, 1.25vw, 24px);
  bottom: clamp(60px, 4.17vw, 80px);
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.17vw, 22.5px);
  z-index: 1000;
  width: auto;
  height: auto;
}

.floating-btn {
  width: clamp(48px, 3.75vw, 72px);
  height: clamp(48px, 3.75vw, 72px);
  min-width: clamp(48px, 3.75vw, 72px);
  min-height: clamp(48px, 3.75vw, 72px);
  border-radius: clamp(24px, 2.11vw, 40.5px);
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 clamp(1px, 0.1vw, 2px) clamp(4px, 0.42vw, 8px) rgba(0, 0, 0, 0.15);
  padding: clamp(12px, 0.94vw, 18px);
  margin: 0;
  flex-shrink: 0;
}

.floating-btn i {
  font-size: clamp(24px, 1.875vw, 36px);
  color: #00699A;
  transition: color 0.3s;
  width: clamp(24px, 1.875vw, 36px);
  height: clamp(24px, 1.875vw, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.floating-btn i::before {
  display: block;
  margin-top: 2px;
}

.floating-btn .back-to-top-icon {
  width: clamp(24px, 1.875vw, 36px);
  height: clamp(24px, 1.875vw, 36px);
  color: #FFFFFF;
  transition: color 0.3s;
  display: block;
}

.floating-btn:hover {
  background: #F5F5F5;
  transform: scale(1.05);
  box-shadow: 0 clamp(2px, 0.21vw, 4px) clamp(8px, 0.63vw, 12px) rgba(0, 0, 0, 0.2);
}

.floating-btn.active i {
  color: #00699A;
}

.floating-btn:last-child {
  background: #333333;
  border: none;
}

.floating-btn:last-child i {
  color: #FFFFFF;
}

.floating-btn:last-child:hover {
  background: #000000;
}

@media (max-width: 768px) {
  .floating-actions {
    right: clamp(12px, 2.08vw, 16px);
    bottom: clamp(48px, 8.33vw, 64px);
  }
  
  .floating-btn {
    width: clamp(40px, 6.25vw, 48px);
    height: clamp(40px, 6.25vw, 48px);
    min-width: clamp(40px, 6.25vw, 48px);
    min-height: clamp(40px, 6.25vw, 48px);
  }
  
  .floating-btn i {
    font-size: clamp(16px, 2.34vw, 18px);
  }
}
</style>
