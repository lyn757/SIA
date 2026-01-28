# Assets 目录说明

此目录用于存放需要被 Vite 处理的静态资源。

## 目录结构

- `icons/` - SVG 图标组件或图标文件
- `images/` - 图片资源（会被 Vite 优化和添加 hash）

## 使用方式

### 引入图片
```vue
<script setup>
import logo from '@/assets/images/logo.png'
</script>

<template>
  <img :src="logo" alt="Logo">
</template>
```

### 引入 SVG 图标
```vue
<script setup>
import icon from '@/assets/icons/my-icon.svg'
</script>

<template>
  <img :src="icon" alt="Icon">
</template>
```

### 在 CSS 中使用
```css
.background {
  background-image: url('@/assets/images/bg.jpg');
}
```

## 注意事项

- 此目录中的文件会被 Vite 处理（压缩、优化、添加 hash）
- 文件路径会在构建时被转换
- 适合存放组件中使用的资源
- 如果是不需要处理的静态文件，请放在 `public/` 目录
