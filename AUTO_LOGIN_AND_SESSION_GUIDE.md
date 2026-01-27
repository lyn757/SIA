# 自动登录和会话管理指南

## 功能概述

本系统实现了以下核心功能：

### 1. 游客自动登录
- **未登录用户**访问项目域名时，系统会自动分配一个游客账号
- 游客账号会自动进入 **C端用户首页**（user-web）
- 后端会随机生成游客ID，格式：`guest_xxxxxxx`

### 2. 记住上次角色
- **已登录/注册用户**关闭系统后，下次访问时会自动进入上次使用的角色对应的子系统
- 系统会记录用户最后访问的角色页面（designer/supplier/contractor/user）
- 即使关闭浏览器，下次打开仍会保持上次的角色状态

### 3. 会话保持时间
- 默认会话保持时间：**7天**
- 在此期间内，用户无需重新登录
- Token过期后会自动清除认证信息

## 技术实现

### 核心文件

1. **packages/main-web/src/stores/auth.ts**
   - 认证状态管理
   - 游客自动登录逻辑
   - Token过期检查
   - 最后活跃角色记录

2. **packages/main-web/src/router/index.ts**
   - 路由守卫
   - 自动重定向逻辑
   - 权限检查

3. **packages/main-web/src/config/auth.ts**
   - 会话时间配置
   - 角色路径映射
   - 游客配置

### 关键功能

#### 游客自动登录
```typescript
// 在路由守卫中自动触发
if (!authStore.isAuthenticated) {
  await authStore.guestAutoLogin()
  next('/user') // 跳转到C端首页
}
```

#### 记住上次角色
```typescript
// 访问不同角色页面时自动记录
if (to.path.startsWith('/designer')) {
  authStore.updateLastActiveRole('designer')
}

// 下次访问根路径时自动跳转
const targetPath = authStore.getLastActiveRoutePath()
next(targetPath)
```

#### Token过期检查
```typescript
const isTokenValid = computed(() => {
  if (!token.value || !tokenExpireTime.value) return false
  return Date.now() < tokenExpireTime.value
})
```

## 配置说明

### 修改会话保持时间

在 `packages/main-web/src/config/auth.ts` 中修改：

```typescript
export const AUTH_CONFIG = {
  // 修改这里的值来改变会话保持时间
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 默认7天
  
  // 可选的预设时间
  SESSION_DURATIONS: {
    ONE_HOUR: 60 * 60 * 1000,           // 1小时
    ONE_DAY: 24 * 60 * 60 * 1000,       // 1天
    THREE_DAYS: 3 * 24 * 60 * 60 * 1000, // 3天
    ONE_WEEK: 7 * 24 * 60 * 60 * 1000,  // 7天
    TWO_WEEKS: 14 * 24 * 60 * 60 * 1000, // 14天
    ONE_MONTH: 30 * 24 * 60 * 60 * 1000  // 30天
  }
}
```

### 修改游客默认进入的页面

```typescript
export const AUTH_CONFIG = {
  GUEST_CONFIG: {
    DEFAULT_ROLE: 'user', // 修改这里来改变游客默认角色
    TOKEN_PREFIX: 'guest-token-',
    USERNAME_PREFIX: 'guest_'
  }
}
```

## 使用场景

### 场景1：首次访问
1. 用户访问 `http://localhost:8080/`
2. 系统检测到未登录
3. 自动创建游客账号并登录
4. 跳转到 `/user`（C端首页）

### 场景2：已登录用户
1. 用户登录并访问设计师端 `/designer`
2. 系统记录 `lastActiveRole = 'designer'`
3. 用户关闭浏览器
4. 7天内再次访问 `http://localhost:8080/`
5. 系统自动跳转到 `/designer`

### 场景3：Token过期
1. 用户7天后再次访问
2. 系统检测到Token已过期
3. 清除认证信息
4. 自动执行游客登录
5. 跳转到 `/user`

## LocalStorage 数据结构

系统在 localStorage 中存储以下数据：

```javascript
{
  "token": "guest-token-1234567890",
  "userInfo": {
    "id": "guest_abc123",
    "username": "guest_abc123",
    "email": "guest_abc123@guest.com",
    "roles": ["guest"]
  },
  "tokenExpireTime": "1738281600000",
  "lastActiveRole": "user"
}
```

## 路由流程图

```
访问域名
    ↓
检查是否为根路径 (/ 或 /dashboard)
    ↓
是 → 检查是否已登录
    ↓
    已登录 → 跳转到上次角色页面
    ↓
    未登录 → 游客自动登录 → 跳转到 /user
    ↓
否 → 检查路由权限
    ↓
    有权限 → 允许访问 + 记录当前角色
    ↓
    无权限 → 跳转到有权限的默认页面
```

## 注意事项

1. **游客权限限制**：游客只能访问 `/user` 路径，访问其他路径会被重定向
2. **Token过期处理**：Token过期后会自动清除，但保留 `lastActiveRole` 用于下次访问
3. **角色切换**：用户在不同角色页面间切换时，系统会自动更新 `lastActiveRole`
4. **会话时间**：可根据业务需求调整，建议不超过30天

## 测试建议

1. **测试游客登录**：
   - 清除 localStorage
   - 访问 `http://localhost:8080/`
   - 验证是否自动跳转到 `/user`

2. **测试角色记忆**：
   - 登录并访问 `/designer`
   - 关闭浏览器
   - 重新打开并访问根路径
   - 验证是否自动跳转到 `/designer`

3. **测试Token过期**：
   - 手动修改 localStorage 中的 `tokenExpireTime` 为过去的时间
   - 刷新页面
   - 验证是否清除认证并执行游客登录
