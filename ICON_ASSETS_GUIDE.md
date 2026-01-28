# 项目图标资源管理指南

## 图标存放位置

根据项目的微前端架构，每个子应用都应该有自己的静态资源文件夹。建议的目录结构如下：

### 1. 主应用 (main-web)

```
packages/main-web/
├── public/                    # 静态资源目录（不会被 Vite 处理）
│   ├── icons/                # 图标文件
│   │   ├── logo.svg
│   │   ├── favicon.ico
│   │   └── ...
│   └── images/               # 其他图片
│       └── ...
└── src/
    └── assets/               # 需要被 Vite 处理的资源
        ├── icons/            # SVG 图标组件
        │   ├── IconUser.vue
        │   ├── IconDesigner.vue
        │   └── ...
        ├── images/           # 图片资源
        │   └── ...
        └── styles/           # 样式文件
            └── ...
```

### 2. 用户端 (user-web)

```
packages/user-web/
├── public/                   # 静态资源目录
│   ├── icons/
│   │   ├── logo.svg
│   │   └── ...
│   └── images/
│       └── ...
└── src/
    └── assets/              # 需要被 Vite 处理的资源
        ├── icons/
        └── images/
```

### 3. 设计师端 (designer-web)

```
packages/designer-web/
├── public/
│   └── icons/
└── src/
    └── assets/
        └── icons/
```

### 4. 供应商端 (supplier-web)

```
packages/supplier-web/
├── public/
│   └── icons/
└── src/
    └── assets/
        └── icons/
```

## 使用场景区分

### public/ 目录
- **用途**: 存放不需要编译处理的静态资源
- **访问方式**: 通过绝对路径访问，如 `/icons/logo.svg`
- **适用场景**:
  - favicon.ico
  - robots.txt
  - 大型图片文件
  - 第三方库的静态资源
  - 不需要 hash 处理的文件

**示例**:
```html
<!-- 在 index.html 中 -->
<link rel="icon" href="/icons/favicon.ico">

<!-- 在 Vue 组件中 -->
<img src="/icons/logo.svg" alt="Logo">
```

### src/assets/ 目录
- **用途**: 存放需要被 Vite 处理的资源（会被打包、压缩、添加 hash）
- **访问方式**: 通过 import 或 @ 别名引入
- **适用场景**:
  - 组件中使用的图标
  - 需要优化的图片
  - SVG 图标组件
  - 样式文件中引用的资源

**示例**:
```vue
<script setup>
import logo from '@/assets/icons/logo.svg'
import IconUser from '@/assets/icons/IconUser.vue'
</script>

<template>
  <img :src="logo" alt="Logo">
  <IconUser />
</template>
```

```css
.background {
  background-image: url('@/assets/images/bg.jpg');
}
```

## 当前项目使用的图标方案

### 1. Bootstrap Icons (推荐用于通用图标)
项目已经使用 Bootstrap Icons，通过 class 方式使用：

```vue
<i class="bi bi-person"></i>
<i class="bi bi-heart"></i>
<i class="bi bi-star"></i>
```

**优点**:
- 无需额外文件
- 图标库丰富
- 易于使用和维护

### 2. Element Plus Icons (主应用使用)
主应用使用 Element Plus 的图标组件：

```vue
<script setup>
import { View, InfoFilled, User } from '@element-plus/icons-vue'
</script>

<template>
  <el-icon><View /></el-icon>
</template>
```

### 3. Emoji 图标 (用于角色选择)
在角色选择卡片中使用 emoji：

```javascript
const roleOptions = [
  { value: 'user', icon: '👤' },
  { value: 'designer', icon: '🎨' },
  { value: 'supplier', icon: '📦' }
]
```

## 添加自定义图标的步骤

### 方案 1: 使用 SVG 文件（推荐）

1. **创建目录**:
```bash
# 在对应的子应用中创建
mkdir -p packages/main-web/src/assets/icons
mkdir -p packages/main-web/public/icons
```

2. **放置 SVG 文件**:
- 如果需要在 CSS 或模板中直接引用: 放在 `src/assets/icons/`
- 如果是静态资源（如 logo）: 放在 `public/icons/`

3. **在组件中使用**:
```vue
<script setup>
import myIcon from '@/assets/icons/my-icon.svg'
</script>

<template>
  <img :src="myIcon" alt="My Icon" class="icon">
</template>
```

### 方案 2: 创建 SVG 组件

1. **创建图标组件** (`src/assets/icons/IconCustom.vue`):
```vue
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>
</template>

<style scoped>
svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

2. **使用图标组件**:
```vue
<script setup>
import IconCustom from '@/assets/icons/IconCustom.vue'
</script>

<template>
  <IconCustom class="text-primary" style="font-size: 24px;" />
</template>
```

### 方案 3: 使用图标字体

如果有大量自定义图标，可以考虑使用 iconfont：

1. 将图标文件放在 `public/fonts/` 目录
2. 在 `src/assets/styles/icons.css` 中定义字体
3. 在 `main.ts` 中引入样式

## 推荐的图标命名规范

- **文件命名**: 使用 kebab-case
  - `user-icon.svg`
  - `shopping-cart.svg`
  - `arrow-right.svg`

- **组件命名**: 使用 PascalCase，以 Icon 开头
  - `IconUser.vue`
  - `IconShoppingCart.vue`
  - `IconArrowRight.vue`

## 图标优化建议

1. **SVG 优化**: 使用 SVGO 工具压缩 SVG 文件
2. **尺寸控制**: 建议图标尺寸为 24x24 或 32x32
3. **颜色**: 使用 `currentColor` 以便通过 CSS 控制颜色
4. **懒加载**: 大型图标可以考虑按需加载

## 示例：创建完整的图标系统

```typescript
// src/assets/icons/index.ts
export { default as IconUser } from './IconUser.vue'
export { default as IconDesigner } from './IconDesigner.vue'
export { default as IconSupplier } from './IconSupplier.vue'
```

```vue
<!-- 使用 -->
<script setup>
import { IconUser, IconDesigner } from '@/assets/icons'
</script>

<template>
  <IconUser />
  <IconDesigner />
</template>
```

## 总结

- **通用图标**: 继续使用 Bootstrap Icons 或 Element Plus Icons
- **自定义图标**: 放在 `src/assets/icons/` 目录
- **静态资源**: 放在 `public/icons/` 目录
- **Logo/Favicon**: 放在 `public/` 根目录或 `public/icons/`
