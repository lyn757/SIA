# 跨应用导航系统

## 概述

本项目使用消息通信机制实现微前端子应用与主应用之间的无刷新路由跳转。

## 架构说明

### 主应用（main-web）

主应用负责监听来自子应用的导航消息，并执行相应的路由跳转。

**实现位置：** `packages/main-web/src/main.ts`

```typescript
window.addEventListener('message', (event) => {
  const { type, path, replace } = event.data
  
  if (type === 'NAVIGATE') {
    if (replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  }
  
  if (type === 'LOGOUT') {
    const authStore = useAuthStore()
    authStore.logout(event.data.clearGuestAccount)
  }
})
```

### 子应用（user-web、designer-web 等）

子应用通过 `postMessage` 发送导航请求给主应用。

**工具函数位置：** `packages/user-web/src/utils/navigation.ts`

## 使用方法

### 方法 1：使用导航工具函数（推荐）

```typescript
import { navigation } from '@/utils/navigation'

// 跳转到登录页
navigation.toLogin()

// 跳转到注册页
navigation.toRegister()

// 跳转到用户端
navigation.toUser()

// 跳转到工作台
navigation.toDashboard()

// 登出
navigation.logout(false) // false = 不清除游客账号
```

### 方法 2：使用通用导航函数

```typescript
import { navigateToMainApp } from '@/utils/navigation'

// 普通跳转
navigateToMainApp('/register')

// 替换当前历史记录（不会在浏览器历史中留下记录）
navigateToMainApp('/login', true)
```

### 方法 3：直接发送消息

```typescript
window.parent.postMessage({
  type: 'NAVIGATE',
  path: '/register',
  replace: false
}, '*')
```

## 消息协议

### NAVIGATE 消息

用于路由跳转。

```typescript
{
  type: 'NAVIGATE',
  path: string,      // 目标路径，如 '/register'
  replace?: boolean  // 可选，是否使用 replace 模式
}
```

### LOGOUT 消息

用于登出操作。

```typescript
{
  type: 'LOGOUT',
  clearGuestAccount?: boolean  // 可选，是否清除游客账号
}
```

## 安全性

主应用会验证消息来源，只接受来自可信子应用的消息：

```typescript
const trustedOrigins = [
  'http://localhost:8084', // user-web
  'http://localhost:8081', // designer-web
  'http://localhost:8082', // supplier-web
  'http://localhost:8083'  // contractor-web
]

if (!trustedOrigins.includes(event.origin)) {
  return // 拒绝不可信的消息
}
```

## 优势

1. **无刷新跳转** - 使用 Vue Router 进行 SPA 式跳转，不会刷新整个页面
2. **保持状态** - 跳转时不会丢失应用状态
3. **更好的用户体验** - 跳转更快，更流畅
4. **安全可控** - 主应用可以验证消息来源，防止恶意跳转
5. **易于扩展** - 可以轻松添加新的消息类型和功能

## 示例：UserAvatar 组件

```vue
<script setup lang="ts">
import { navigation } from '@/utils/navigation'

// 处理登录
const handleLogin = () => {
  navigation.toLogin()
}

// 处理注册
const handleRegister = () => {
  navigation.toRegister()
}

// 处理升级账号
const handleUpgrade = () => {
  navigation.toRegister()
}

// 处理登出
const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    navigation.logout(false)
  }
}
</script>
```

## 调试

所有导航操作都会在控制台输出日志：

```
Navigating to main app: /register
收到子应用导航请求: /register
```

可以通过这些日志来调试跨应用导航问题。

## 扩展其他子应用

如果要在其他子应用（designer-web、supplier-web 等）中使用跨应用导航：

1. 复制 `packages/user-web/src/utils/navigation.ts` 到对应子应用
2. 在组件中导入并使用 `navigation` 工具
3. 确保子应用的 origin 已添加到主应用的 `trustedOrigins` 列表中

## 注意事项

1. **开发环境** - 当前配置的是 localhost 端口，生产环境需要更新 `trustedOrigins`
2. **独立运行** - 工具函数会自动检测是否在微前端环境中，独立运行时会降级为普通跳转
3. **浏览器兼容性** - `postMessage` API 在所有现代浏览器中都支持

## 相关文件

- 主应用监听器：`packages/main-web/src/main.ts`
- 导航工具函数：`packages/user-web/src/utils/navigation.ts`
- 使用示例：`packages/user-web/src/components/UserAvatar.vue`
