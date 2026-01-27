# 微前端导航修复说明

## 问题描述

用户在 C 端（user-web）点击"升级为正式用户"按钮时，无法跳转到主应用的注册页面。

## 根本原因

**微前端架构导致的导航问题：**

user-web 作为微前端应用运行在 main-web 的沙箱环境中（通过 wujie 框架）。当在微前端内部使用以下方式导航时：

- `window.location.href = '/register'`
- `<a href="/register">`
- `router.push('/register')`

这些方法只会在微前端的路由上下文中尝试导航，无法访问主应用（main-web）的路由。

## 解决方案

### 核心修复：使用 `window.parent.location.href`

在微前端环境中，需要通过父窗口来控制主应用的导航：

```typescript
const handleUpgrade = () => {
  console.log('Upgrading to full account...')
  // 检查是否在微前端环境中
  if (window.parent && window.parent !== window) {
    // 通过父窗口跳转到主应用路由
    window.parent.location.href = '/register'
  } else {
    // 独立运行时使用普通跳转
    window.location.href = '/register'
  }
}
```

### 模板修改

将按钮改为链接，使用 `@click.prevent` 阻止默认行为：

```vue
<a href="javascript:void(0)" @click.prevent="handleUpgrade" class="dropdown-item text-primary">
  <i class="bi bi-person-plus me-2"></i>{{ $t('nav.upgradeAccount') }}
</a>
```

## 修改的文件

### SIA/packages/user-web/src/components/UserAvatar.vue

修改了以下函数以支持微前端导航：

1. **handleLogin()** - 登录按钮点击
2. **handleRegister()** - 注册按钮点击
3. **handleUpgrade()** - 升级账号按钮点击（新增）
4. **handleLogout()** - 登出按钮点击

所有函数都使用相同的模式：

```typescript
if (window.parent && window.parent !== window) {
  window.parent.location.href = '/target-route'
} else {
  window.location.href = '/target-route'
}
```

## 技术细节

### 微前端环境检测

```typescript
window.parent && window.parent !== window
```

- `window.parent` - 获取父窗口对象
- `window.parent !== window` - 检查当前窗口是否在 iframe 或沙箱中运行
- 如果条件为真，说明在微前端环境中，需要使用 `window.parent.location.href`
- 如果条件为假，说明独立运行，使用 `window.location.href`

### 为什么不能使用 Vue Router

Vue Router 只能管理当前应用的路由，无法跨应用导航。在微前端架构中：

- **user-web** 有自己的 Vue Router 实例，管理 `/profile`、`/cart` 等路由
- **main-web** 有自己的 Vue Router 实例，管理 `/login`、`/register`、`/user` 等路由

两个路由系统是独立的，因此需要使用 `window.parent.location.href` 来实现跨应用导航。

## 测试步骤

1. 启动所有服务：
   ```bash
   npm run dev
   ```

2. 访问 http://localhost:8080

3. 系统会自动创建游客账号并进入 C 端

4. 点击右上角的用户头像

5. 点击"升级为正式用户"

6. **预期结果：** 页面跳转到主应用的注册页面（http://localhost:8080/register）

## 其他受影响的功能

以下功能也使用了相同的修复方案：

- **登录按钮** - 未登录用户点击登录
- **注册按钮** - 未登录用户点击注册
- **登出按钮** - 已登录用户点击登出

所有这些功能现在都能正确地在微前端环境中导航到主应用的对应页面。

## 注意事项

1. **安全性：** 使用 `window.parent.location.href` 是安全的，因为只是改变 URL，不涉及跨域数据访问

2. **兼容性：** 代码同时支持微前端环境和独立运行环境

3. **调试：** 所有导航函数都包含 `console.log`，便于调试

4. **用户体验：** 使用 `location.href` 会导致整页刷新，这是预期行为，因为需要从微前端切换到主应用

## 相关文档

- [DEBUG_USER_AVATAR.md](./DEBUG_USER_AVATAR.md) - 详细的调试指南
- [GUEST_ACCESS_GUIDE.md](./GUEST_ACCESS_GUIDE.md) - 游客访问功能说明
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - 整体实现总结
