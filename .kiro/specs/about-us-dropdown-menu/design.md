# Design Document: About Us Dropdown Menu

## Overview

本设计文档描述了"关于我们"下拉菜单功能的技术实现方案。该功能将在用户首页的顶部导航栏中添加一个交互式下拉菜单，当用户鼠标悬停在"关于我们"链接时显示。菜单包含三列内容：平台信息、快速链接和联系方式，支持国际化和响应式设计。

## Architecture

### Component Structure

```
Home.vue (existing)
  └── AboutUsDropdown.vue (new component)
      ├── LeftColumn (platform info)
      ├── MiddleColumn (quick links & support)
      └── RightColumn (contact info)
```

### Technology Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Scoped CSS with responsive design
- **Icons**: Bootstrap Icons (already in use)
- **I18n**: Existing i18n plugin from `@/plugins/i18n.ts`

### Integration Points

1. **Home.vue**: 修改现有的"关于我们"链接，添加下拉菜单组件
2. **I18n System**: 使用已定义的 `about.*` 翻译键
3. **Clipboard API**: 用于复制邮箱地址功能

## Components and Interfaces

### AboutUsDropdown Component

**Props**: None (使用 inject 获取 i18n 实例)

**Emits**: None

**State**:
```typescript
interface State {
  isVisible: boolean;        // 菜单是否可见
  showCopyNotification: boolean;  // 是否显示复制成功提示
}
```

**Methods**:
```typescript
// 显示菜单
function showMenu(): void

// 隐藏菜单
function hideMenu(): void

// 复制邮箱到剪贴板
function copyEmail(): Promise<void>

// 隐藏复制提示
function hideCopyNotification(): void
```

### Component Template Structure

```vue
<template>
  <div class="about-dropdown-wrapper">
    <a 
      href="#" 
      class="nav-link"
      @mouseenter="showMenu"
      @mouseleave="hideMenu"
    >
      {{ $t('nav.about') }}
    </a>
    
    <transition name="dropdown-fade">
      <div 
        v-if="isVisible"
        class="dropdown-menu"
        @mouseenter="showMenu"
        @mouseleave="hideMenu"
      >
        <!-- Left Column: Platform Info -->
        <div class="menu-column left-column">
          <div class="platform-logo">
            <i class="bi bi-house-door"></i>
          </div>
          <h4 class="platform-name">{{ $t('about.company') }}</h4>
          <p class="platform-desc">{{ $t('about.description') }}</p>
        </div>
        
        <!-- Middle Column: Quick Links & Support -->
        <div class="menu-column middle-column">
          <div class="links-section">
            <h5 class="section-title">{{ $t('about.quickLinks') }}</h5>
            <a href="#" class="menu-link">{{ $t('about.sitemap') }}</a>
            <a href="#" class="menu-link">{{ $t('about.terms') }}</a>
            <a href="#" class="menu-link">{{ $t('about.privacy') }}</a>
            <a href="#" class="menu-link">{{ $t('about.partners') }}</a>
          </div>
          <div class="links-section">
            <h5 class="section-title">{{ $t('about.support') }}</h5>
            <a href="#" class="menu-link">{{ $t('about.help') }}</a>
            <a href="#" class="menu-link">{{ $t('about.faq') }}</a>
            <a href="#" class="menu-link">{{ $t('about.feedback') }}</a>
          </div>
        </div>
        
        <!-- Right Column: Contact Info -->
        <div class="menu-column right-column">
          <h5 class="section-title">{{ $t('about.contact') }}</h5>
          <div class="contact-item">
            <i class="bi bi-geo-alt"></i>
            <span>{{ $t('about.address') }}</span>
          </div>
          <div class="contact-item">
            <i class="bi bi-telephone"></i>
            <span>{{ $t('about.phone') }}</span>
          </div>
          <div class="contact-item clickable" @click="copyEmail">
            <i class="bi bi-envelope"></i>
            <span>{{ $t('about.email') }}</span>
          </div>
        </div>
        
        <!-- Copy Notification -->
        <transition name="notification-fade">
          <div v-if="showCopyNotification" class="copy-notification">
            Email copied to clipboard!
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
```

## Data Models

### Hover State Management

```typescript
// 使用 ref 管理菜单可见性
const isVisible = ref<boolean>(false);

// 使用 ref 管理复制提示
const showCopyNotification = ref<boolean>(false);

// 定时器引用，用于延迟隐藏
let hideTimer: number | null = null;
let notificationTimer: number | null = null;
```

### I18n Integration

```typescript
// 注入 i18n 实例
const i18n = inject<I18nPlugin>('i18n');

// 使用 $t 函数进行翻译
const $t = (key: string) => i18n?.t(key) || key;
```

## Correctness Properties

*属性是一种特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的正式陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### Property 1: Menu Visibility on Hover

*For any* hover event on the About link or dropdown menu, the menu should become visible and remain visible as long as the mouse is over either element.

**Validates: Requirements 1.1, 1.2**

### Property 2: Menu Hiding on Mouse Leave

*For any* mouse leave event when the pointer exits both the About link and dropdown menu, the menu should hide.

**Validates: Requirements 1.3**

### Property 3: Menu Positioning

*For any* viewport size, when the dropdown menu is visible, it should be positioned directly below the About link with proper alignment.

**Validates: Requirements 1.4**

### Property 4: Content Alignment and Spacing

*For any* rendered state of the dropdown menu, all content should maintain proper alignment and spacing according to the design specifications.

**Validates: Requirements 2.5**

### Property 5: Link Hover Effects

*For any* link in the quick links or service support sections, hovering over the link should apply the hover effect styling.

**Validates: Requirements 4.7, 5.6**

### Property 6: Email Copy Functionality

*For any* click event on the email contact item, the system should copy the email address to the clipboard and display a notification.

**Validates: Requirements 6.8, 6.9**

### Property 7: Language Reactivity

*For any* language change event in the i18n system, all text content in the dropdown menu should update immediately to reflect the new language without requiring a page reload.

**Validates: Requirements 7.4**

### Property 8: I18n Key Usage

*For all* text content in the dropdown menu, the system should use i18n keys from the i18n.ts file rather than hardcoded strings.

**Validates: Requirements 7.5**

### Property 9: Responsive Layout Constraints

*For any* viewport width, the dropdown menu should not overflow the viewport and should maintain proper spacing.

**Validates: Requirements 8.3, 8.4**

### Property 10: Minimum Font Size

*For any* screen size, all text content should maintain a minimum readable font size.

**Validates: Requirements 8.5**

## Error Handling

### Clipboard API Errors

```typescript
async function copyEmail(): Promise<void> {
  try {
    const email = i18n?.t('about.email') || '';
    await navigator.clipboard.writeText(email);
    showCopyNotification.value = true;
    
    // 自动隐藏提示
    if (notificationTimer) clearTimeout(notificationTimer);
    notificationTimer = window.setTimeout(() => {
      showCopyNotification.value = false;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy email:', error);
    // 降级方案：使用传统的 document.execCommand
    fallbackCopyEmail();
  }
}

function fallbackCopyEmail(): void {
  const email = i18n?.t('about.email') || '';
  const textArea = document.createElement('textarea');
  textArea.value = email;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    showCopyNotification.value = true;
    
    if (notificationTimer) clearTimeout(notificationTimer);
    notificationTimer = window.setTimeout(() => {
      showCopyNotification.value = false;
    }, 2000);
  } catch (error) {
    console.error('Fallback copy also failed:', error);
  } finally {
    document.body.removeChild(textArea);
  }
}
```

### I18n Missing Keys

如果 i18n 键不存在，系统将返回键名本身作为降级显示：

```typescript
const $t = (key: string) => i18n?.t(key) || key;
```

### Timer Cleanup

确保在组件卸载时清理所有定时器：

```typescript
onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer);
  if (notificationTimer) clearTimeout(notificationTimer);
});
```

## Testing Strategy

### Dual Testing Approach

本功能将采用单元测试和属性测试相结合的方式：

**Unit Tests**: 
- 验证特定的 UI 交互示例
- 测试边界情况（如响应式断点）
- 测试错误处理路径

**Property Tests**:
- 验证跨所有输入的通用属性
- 测试状态转换的一致性
- 验证 i18n 集成的完整性

### Property-Based Testing Configuration

- **Library**: Vitest with @fast-check/vitest (for TypeScript/Vue)
- **Iterations**: Minimum 100 iterations per property test
- **Tag Format**: `// Feature: about-us-dropdown-menu, Property {number}: {property_text}`

### Test Coverage Areas

1. **Interaction Tests**:
   - Menu show/hide on hover
   - Email copy functionality
   - Link hover effects

2. **I18n Tests**:
   - All three languages render correctly
   - Language switching updates content
   - All i18n keys are used

3. **Responsive Tests**:
   - Layout at different viewport sizes
   - Content overflow prevention
   - Font size constraints

4. **Integration Tests**:
   - Integration with existing Home.vue
   - I18n plugin integration
   - Clipboard API integration

### Example Unit Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutUsDropdown from '@/components/AboutUsDropdown.vue';

describe('AboutUsDropdown', () => {
  it('should display menu on hover', async () => {
    const wrapper = mount(AboutUsDropdown);
    const link = wrapper.find('.nav-link');
    
    await link.trigger('mouseenter');
    expect(wrapper.find('.dropdown-menu').isVisible()).toBe(true);
  });
  
  it('should hide menu on mouse leave', async () => {
    const wrapper = mount(AboutUsDropdown);
    const link = wrapper.find('.nav-link');
    
    await link.trigger('mouseenter');
    await link.trigger('mouseleave');
    
    // Wait for transition
    await new Promise(resolve => setTimeout(resolve, 300));
    expect(wrapper.find('.dropdown-menu').exists()).toBe(false);
  });
});
```

### Example Property Test Structure

```typescript
import { describe, it } from 'vitest';
import { fc, test } from '@fast-check/vitest';

describe('AboutUsDropdown Properties', () => {
  // Feature: about-us-dropdown-menu, Property 7: Language Reactivity
  test.prop([fc.constantFrom('zh', 'en', 'es')])(
    'should update all text when language changes',
    async (locale) => {
      const wrapper = mount(AboutUsDropdown, {
        global: {
          provide: {
            i18n: createMockI18n(locale)
          }
        }
      });
      
      // Verify all text uses the correct locale
      const allText = wrapper.text();
      const expectedTexts = getExpectedTexts(locale);
      
      expectedTexts.forEach(text => {
        expect(allText).toContain(text);
      });
    }
  );
});
```

## Implementation Notes

### CSS Transitions

使用 Vue 的 `<transition>` 组件实现平滑的显示/隐藏动画：

```css
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
```

### Responsive Breakpoints

```css
/* Desktop: 3 columns horizontal */
@media (min-width: 769px) {
  .dropdown-menu {
    display: flex;
    flex-direction: row;
  }
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .dropdown-menu {
    display: flex;
    flex-direction: column;
  }
}
```

### Z-Index Management

确保下拉菜单在其他元素之上：

```css
.dropdown-menu {
  position: absolute;
  z-index: 1002; /* Higher than main-header (1000) */
}
```

### Accessibility Considerations

虽然不在当前需求中，但建议添加：
- ARIA labels for screen readers
- Keyboard navigation support (Tab, Escape)
- Focus management
