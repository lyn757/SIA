# Implementation Plan: About Us Dropdown Menu

## Overview

本实现计划将"关于我们"下拉菜单功能分解为一系列增量式的编码任务。每个任务都建立在前一个任务的基础上，确保功能逐步完善并及时验证。

## Tasks

- [x] 1. 创建 AboutUsDropdown 组件基础结构
  - 在 `packages/user-web/src/components/` 目录下创建 `AboutUsDropdown.vue` 文件
  - 使用 Vue 3 Composition API 和 `<script setup>` 语法
  - 定义基本的响应式状态：`isVisible` 和 `showCopyNotification`
  - 实现基本的模板结构，包含三列布局
  - 添加 TypeScript 类型定义
  - _Requirements: 10.1, 10.2, 10.3, 10.5_

- [-] 2. 实现菜单显示/隐藏交互逻辑
  - [x] 2.1 实现 `showMenu` 和 `hideMenu` 方法
    - 添加鼠标悬停事件处理
    - 实现延迟隐藏逻辑（防止菜单闪烁）
    - 确保菜单在鼠标悬停在链接或菜单上时保持可见
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ] 2.2 编写属性测试：菜单可见性
    - **Property 1: Menu Visibility on Hover**
    - **Property 2: Menu Hiding on Mouse Leave**
    - **Validates: Requirements 1.1, 1.2, 1.3**

- [-] 3. 实现左侧列 - 平台信息
  - [x] 3.1 添加平台 logo 图标
    - 使用 Bootstrap Icons 的 `bi-house-door` 图标
    - 添加适当的样式和尺寸
    - _Requirements: 3.2_

  - [x] 3.2 集成 i18n 显示平台名称和描述
    - 使用 `about.company` 键显示平台名称
    - 使用 `about.description` 键显示平台描述
    - 确保文本使用突出的样式
    - _Requirements: 3.1, 3.3, 3.4, 3.5_

  - [ ] 3.3 编写单元测试：左侧列内容
    - 测试 logo 图标是否存在
    - 测试平台名称和描述是否正确显示
    - 测试 i18n 键的使用
    - _Requirements: 3.1, 3.2, 3.3_

- [-] 4. 实现中间列 - 快速链接和服务支持
  - [x] 4.1 添加快速链接部分
    - 使用 `about.quickLinks` 键显示标题
    - 添加四个链接：网站地图、服务条款、隐私政策、合作品牌
    - 使用对应的 i18n 键：`about.sitemap`, `about.terms`, `about.privacy`, `about.partners`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 4.2 添加服务支持部分
    - 使用 `about.support` 键显示标题
    - 添加三个链接：帮助中心、常见问题、意见反馈
    - 使用对应的 i18n 键：`about.help`, `about.faq`, `about.feedback`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 4.3 实现链接悬停效果
    - 添加 CSS 悬停样式
    - 确保与导航栏其他链接的样式一致
    - _Requirements: 4.7, 5.6, 9.3_

  - [ ] 4.4 编写属性测试：链接悬停效果
    - **Property 5: Link Hover Effects**
    - **Validates: Requirements 4.7, 5.6**

  - [ ] 4.5 编写单元测试：中间列内容
    - 测试快速链接部分的四个链接
    - 测试服务支持部分的三个链接
    - 测试所有 i18n 键的使用
    - _Requirements: 4.1, 4.2, 5.1, 5.2_

- [-] 5. 实现右侧列 - 联系信息
  - [x] 5.1 添加联系信息显示
    - 使用 `about.contact` 键显示标题
    - 添加地址信息，使用 `bi-geo-alt` 图标和 `about.address` 键
    - 添加电话信息，使用 `bi-telephone` 图标和 `about.phone` 键
    - 添加邮箱信息，使用 `bi-envelope` 图标和 `about.email` 键
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [x] 5.2 实现邮箱复制功能
    - 实现 `copyEmail` 方法，使用 Clipboard API
    - 添加降级方案（使用 `document.execCommand`）
    - 实现复制成功提示显示逻辑
    - 添加自动隐藏提示的定时器
    - _Requirements: 6.8, 6.9_

  - [ ] 5.3 编写属性测试：邮箱复制功能
    - **Property 6: Email Copy Functionality**
    - **Validates: Requirements 6.8, 6.9**

  - [ ] 5.4 编写单元测试：右侧列内容和复制功能
    - 测试联系信息的显示
    - 测试图标的存在
    - 测试邮箱点击事件
    - 测试复制提示的显示和隐藏
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_

- [ ] 6. Checkpoint - 确保基本功能正常
  - 确保所有测试通过，如有问题请询问用户。

- [-] 7. 实现国际化支持
  - [x] 7.1 集成 i18n 插件
    - 使用 `inject` 获取 i18n 实例
    - 确保所有文本使用 i18n 键而非硬编码
    - _Requirements: 7.5_

  - [x] 7.2 实现语言切换响应
    - 监听语言切换事件
    - 确保内容立即更新
    - _Requirements: 7.4_

  - [ ] 7.3 编写属性测试：语言响应性
    - **Property 7: Language Reactivity**
    - **Property 8: I18n Key Usage**
    - **Validates: Requirements 7.4, 7.5**

  - [ ] 7.4 编写单元测试：三种语言显示
    - 测试中文显示
    - 测试英文显示
    - 测试西班牙语显示
    - _Requirements: 7.1, 7.2, 7.3_

- [-] 8. 实现样式和视觉效果
  - [x] 8.1 添加基础样式
    - 实现三列布局的 CSS
    - 添加菜单定位样式（绝对定位在链接下方）
    - 添加阴影效果
    - 添加圆角效果
    - _Requirements: 1.4, 1.5, 9.4, 9.5_

  - [x] 8.2 实现过渡动画
    - 使用 Vue 的 `<transition>` 组件
    - 添加淡入淡出和位移动画
    - 设置动画时长为 200ms
    - _Requirements: 1.1, 1.3_

  - [x] 8.3 确保样式一致性
    - 使用与导航栏相同的颜色方案
    - 使用一致的字体系列和大小
    - 确保链接悬停效果与其他导航链接一致
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ] 8.4 编写属性测试：菜单定位
    - **Property 3: Menu Positioning**
    - **Validates: Requirements 1.4**

  - [ ] 8.5 编写单元测试：样式一致性
    - 测试颜色方案
    - 测试字体属性
    - 测试圆角和阴影
    - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [-] 9. 实现响应式设计
  - [x] 9.1 添加响应式布局
    - 在桌面端（>768px）显示三列水平布局
    - 在移动端（≤768px）显示垂直堆叠布局
    - 确保内容不溢出视口
    - _Requirements: 8.1, 8.2, 8.4_

  - [x] 9.2 确保内容可读性
    - 设置最小字体大小
    - 确保适当的间距和对齐
    - _Requirements: 8.3, 8.5_

  - [ ] 9.3 编写属性测试：响应式约束
    - **Property 9: Responsive Layout Constraints**
    - **Property 10: Minimum Font Size**
    - **Validates: Requirements 8.3, 8.4, 8.5**

  - [ ] 9.4 编写单元测试：响应式断点
    - 测试桌面端布局（>768px）
    - 测试移动端布局（≤768px）
    - _Requirements: 8.1, 8.2_

- [-] 10. 集成到 Home.vue
  - [x] 10.1 修改 Home.vue 导航栏
    - 导入 AboutUsDropdown 组件
    - 替换现有的"关于我们"链接为 AboutUsDropdown 组件
    - 确保组件正确定位
    - _Requirements: 1.4_

  - [x] 10.2 测试集成
    - 确保组件在 Home.vue 中正常工作
    - 测试与其他导航元素的交互
    - 验证 z-index 层级正确
    - _Requirements: 1.4, 1.5_

  - [ ] 10.3 编写属性测试：内容对齐
    - **Property 4: Content Alignment and Spacing**
    - **Validates: Requirements 2.5**

  - [ ] 10.4 编写集成测试
    - 测试组件在 Home.vue 中的渲染
    - 测试与 i18n 系统的集成
    - 测试与现有导航栏的兼容性
    - _Requirements: 1.4, 7.4, 9.1_

- [-] 11. 添加生命周期清理
  - [x] 11.1 实现定时器清理
    - 在 `onBeforeUnmount` 中清理所有定时器
    - 防止内存泄漏
    - _Requirements: 10.4_

  - [ ] 11.2 编写单元测试：生命周期清理
    - 测试组件卸载时定时器被清理
    - _Requirements: 10.4_

- [ ] 12. Final Checkpoint - 确保所有测试通过
  - 运行所有单元测试和属性测试
  - 确保所有功能正常工作
  - 如有问题请询问用户。

## Notes

- 所有任务都是必需的，确保完整的测试覆盖
- 每个任务都引用了具体的需求编号以便追溯
- Checkpoint 任务确保增量验证
- 属性测试验证通用正确性属性
- 单元测试验证具体示例和边界情况
