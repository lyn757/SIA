/**
 * 响应式尺寸计算工具
 * 用于将设计稿中的固定尺寸转换为响应式尺寸
 */

export class ResponsiveUtils {
  // 设计稿基准尺寸（根据实际设计稿调整）
  private static baseWidth = 1920;
  private static baseHeight = 1080;

  /**
   * 将像素值转换为 vw 单位
   * @param px 设计稿中的像素值
   * @param base 基准宽度（默认1920）
   * @returns vw 字符串
   */
  static vw(px: number, base: number = this.baseWidth): string {
    return `${(px / base) * 100}vw`;
  }

  /**
   * 将像素值转换为 vh 单位
   * @param px 设计稿中的像素值
   * @param base 基准高度（默认1080）
   * @returns vh 字符串
   */
  static vh(px: number, base: number = this.baseHeight): string {
    return `${(px / base) * 100}vh`;
  }

  /**
   * 生成 clamp() 函数字符串
   * @param ideal 理想尺寸（px）
   * @param min 最小值（px）
   * @param max 最大值（px）
   * @returns clamp() 字符串
   */
  static clamp(ideal: number, min: number, max: number): string {
    const vwValue = this.vw(ideal);
    return `clamp(${min}px, ${vwValue}, ${max}px)`;
  }

  /**
   * 获取当前视口信息
   */
  static getViewport() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight,
    };
  }

  /**
   * 判断当前断点
   */
  static getBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    if (width < 1400) return 'xl';
    return 'xxl';
  }

  /**
   * 判断是否为移动端
   */
  static isMobile(): boolean {
    return window.innerWidth < 768;
  }

  /**
   * 判断是否为平板
   */
  static isTablet(): boolean {
    const width = window.innerWidth;
    return width >= 768 && width < 992;
  }

  /**
   * 判断是否为桌面端
   */
  static isDesktop(): boolean {
    return window.innerWidth >= 992;
  }

  /**
   * 监听视口变化
   * @param callback 回调函数
   * @returns 取消监听的函数
   */
  static onResize(callback: (viewport: ReturnType<typeof this.getViewport>) => void) {
    const handler = () => callback(this.getViewport());
    window.addEventListener('resize', handler);
    // 立即执行一次
    handler();
    // 返回取消监听的函数
    return () => window.removeEventListener('resize', handler);
  }

  /**
   * 防抖版本的 resize 监听
   * @param callback 回调函数
   * @param delay 延迟时间（ms）
   * @returns 取消监听的函数
   */
  static onResizeDebounced(
    callback: (viewport: ReturnType<typeof this.getViewport>) => void,
    delay: number = 200
  ) {
    let timeoutId: number;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(this.getViewport());
      }, delay);
    };
    window.addEventListener('resize', handler);
    // 立即执行一次
    callback(this.getViewport());
    // 返回取消监听的函数
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handler);
    };
  }
}

/**
 * 快捷函数
 */
export const vw = ResponsiveUtils.vw;
export const vh = ResponsiveUtils.vh;
export const clamp = ResponsiveUtils.clamp;
