import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * 响应式设计 Composable
 * 提供响应式尺寸计算和断点判断功能
 */
export function useResponsive() {
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 1080);

  // 更新窗口尺寸
  const updateSize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  // 计算响应式属性
  const responsive = computed(() => {
    const width = windowWidth.value;
    const height = windowHeight.value;

    return {
      // 视口信息
      viewport: {
        width,
        height,
        ratio: width / height,
      },

      // 断点判断
      breakpoint: (() => {
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        if (width < 1400) return 'xl';
        return 'xxl';
      })() as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl',

      // 设备类型
      isMobile: width < 768,
      isTablet: width >= 768 && width < 992,
      isDesktop: width >= 992,

      // 尺寸计算函数
      vw: (px: number, base = 1920) => `${(px / base) * 100}vw`,
      vh: (px: number, base = 1080) => `${(px / base) * 100}vh`,
      clamp: (ideal: number, min: number, max: number) =>
        `clamp(${min}px, ${(ideal / 1920) * 100}vw, ${max}px)`,

      // 根据断点返回不同的值
      responsive: <T>(values: {
        xs?: T;
        sm?: T;
        md?: T;
        lg?: T;
        xl?: T;
        xxl?: T;
        default: T;
      }): T => {
        const bp = (() => {
          if (width < 576) return 'xs';
          if (width < 768) return 'sm';
          if (width < 992) return 'md';
          if (width < 1200) return 'lg';
          if (width < 1400) return 'xl';
          return 'xxl';
        })();

        return values[bp] ?? values.default;
      },
    };
  });

  // 生命周期钩子
  onMounted(() => {
    window.addEventListener('resize', updateSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize);
  });

  return responsive;
}

/**
 * 防抖版本的响应式 Composable
 * @param delay 防抖延迟时间（ms）
 */
export function useResponsiveDebounced(delay: number = 200) {
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 1080);
  let timeoutId: number;

  const updateSize = () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      windowWidth.value = window.innerWidth;
      windowHeight.value = window.innerHeight;
    }, delay);
  };

  const responsive = computed(() => {
    const width = windowWidth.value;
    const height = windowHeight.value;

    return {
      viewport: {
        width,
        height,
        ratio: width / height,
      },
      breakpoint: (() => {
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        if (width < 1400) return 'xl';
        return 'xxl';
      })() as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl',
      isMobile: width < 768,
      isTablet: width >= 768 && width < 992,
      isDesktop: width >= 992,
      vw: (px: number, base = 1920) => `${(px / base) * 100}vw`,
      vh: (px: number, base = 1080) => `${(px / base) * 100}vh`,
      clamp: (ideal: number, min: number, max: number) =>
        `clamp(${min}px, ${(ideal / 1920) * 100}vw, ${max}px)`,
      responsive: <T>(values: {
        xs?: T;
        sm?: T;
        md?: T;
        lg?: T;
        xl?: T;
        xxl?: T;
        default: T;
      }): T => {
        const bp = (() => {
          if (width < 576) return 'xs';
          if (width < 768) return 'sm';
          if (width < 992) return 'md';
          if (width < 1200) return 'lg';
          if (width < 1400) return 'xl';
          return 'xxl';
        })();
        return values[bp] ?? values.default;
      },
    };
  });

  onMounted(() => {
    window.addEventListener('resize', updateSize);
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);
    window.removeEventListener('resize', updateSize);
  });

  return responsive;
}
