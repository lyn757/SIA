# 游客访问功能说明

## 功能概述

本系统支持游客无需注册即可访问 C 端用户端，系统会自动为游客生成临时账号。游客可以选择保存账号信息以便下次继续使用，或者注册成为正式用户。

## 主要功能

### 1. 游客访问流程

1. **直接访问**
   - 用户访问 `/user` 路径时，如果未登录，系统会自动创建游客账号
   - 后端生成临时账号（用户名和密码）
   - 自动登录并进入 C 端用户端

2. **登录页游客入口**
   - 在登录页面点击"以游客身份访问"按钮
   - 系统创建游客账号并自动登录
   - 跳转到 C 端用户端

### 2. 游客账号管理

#### 账号生成
- 游客 ID: `guest_` + 时间戳
- 用户名: `Guest_` + 随机字符串
- 密码: 随机生成的 10 位字符串
- Token 有效期: 7 天

#### 账号保存
当游客关闭页面或切换标签页时，系统会弹出保存账号的对话框：

**弹窗内容：**
- 显示系统生成的临时账号信息
- 允许用户修改用户名和密码
- 提供"保存账号"和"不需要"两个选项

**用户选择：**
- **保存账号**: 更新账号信息，标记为已保存，下次不再提示
- **不需要**: 清除游客账号信息，下次访问需要重新创建

**智能提示：**
- 只有首次创建的游客账号会提示保存
- 已保存的游客账号不会重复提示
- 通过 `isSaved` 标记来判断是否需要提示

### 3. Token 过期处理

#### Token 检查
- 系统启动时检查 token 是否过期
- Token 过期时间存储在 `localStorage.tokenExpiry`
- 如果 token 过期，自动清除认证状态并跳转到登录页

#### 自动恢复
- 如果 token 未过期且有上次访问的路由记录
- 系统会自动跳转到上次关闭时的页面
- 上次访问路由存储在 `localStorage.lastVisitedRoute`

### 4. 角色注册

#### 注册流程
1. 点击"注册"按钮进入注册页面
2. 选择角色卡片（用户、设计师、供应商、施工方）
3. 填写对应角色的注册信息
4. 提交注册，成为正式用户

#### 角色系统
- **用户 (user)**: 浏览和购买商品
- **设计师 (designer)**: 提供设计服务
- **供应商 (supplier)**: 提供商品和服务
- **施工方 (contractor)**: 提供施工服务

### 5. 登录后路由

#### 角色路由映射
```javascript
{
  designer: '/designer',    // B端设计师端
  supplier: '/supplier',    // B端供应商端
  contractor: '/contractor', // B端施工端
  user: '/user',            // C端用户端
  guest: '/guest'           // 游客模式
}
```

#### 路由权限
- 游客账号拥有 `['guest', 'user']` 角色
- 可以访问用户端和游客模式的所有功能
- 注册后根据选择的角色获得对应权限

## 技术实现

### 数据存储

#### LocalStorage 存储项
```javascript
{
  token: string,              // 认证 token
  tokenExpiry: string,        // token 过期时间戳
  userInfo: string,           // 用户信息 JSON
  guestAccount: string,       // 游客账号信息 JSON
  lastVisitedRoute: string,   // 最后访问的路由
  locale: string              // 语言设置
}
```

#### GuestAccount 结构
```typescript
interface GuestAccount {
  id: string              // 游客 ID
  username: string        // 用户名
  password: string        // 密码
  createdAt: number       // 创建时间戳
  isSaved?: boolean       // 是否已保存（避免重复提示）
}
```

#### UserInfo 结构
```typescript
interface UserInfo {
  id: string
  username: string
  email: string
  roles: string[]
  avatar?: string
  isGuest?: boolean       // 是否为游客
  guestAccountId?: string // 游客账号 ID
}
```

### 核心方法

#### AuthStore 方法
- `createGuestAccount()`: 创建游客账号
- `updateGuestAccount(username, password)`: 更新游客账号信息
- `saveLastVisitedRoute(route)`: 保存最后访问的路由
- `initializeAuth()`: 初始化认证状态（包含 token 过期检查）
- `logout(clearGuestAccount)`: 登出（可选清除游客账号）

#### 路由守卫
```typescript
router.beforeEach(async (to, from, next) => {
  // 访问用户端且未登录，自动创建游客账号
  if (to.path === '/user' && !authStore.isAuthenticated) {
    await authStore.createGuestAccount()
    authStore.saveLastVisitedRoute(to.path)
    next()
    return
  }
  
  // 保存最后访问的路由
  if (to.path !== '/login' && to.path !== '/register') {
    authStore.saveLastVisitedRoute(to.path)
  }
  
  // ... 其他权限检查
})
```

### 页面关闭监听

#### beforeunload 事件
```javascript
window.addEventListener('beforeunload', (e) => {
  if (authStore.isGuest) {
    const guestAccount = localStorage.getItem('guestAccount')
    if (guestAccount) {
      e.preventDefault()
      e.returnValue = ''
      // 显示保存账号弹窗
    }
  }
})
```

#### visibilitychange 事件
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden && authStore.isGuest) {
    // 页面隐藏时显示保存账号弹窗
  }
})
```

## 用户体验流程

### 场景 1: 首次游客访问
1. 用户直接访问系统或点击"以游客身份访问"
2. 系统自动创建游客账号并登录
3. 进入 C 端用户端浏览内容
4. 关闭页面时弹出保存账号对话框
5. 用户选择保存或取消

### 场景 2: 游客转正式用户
1. 游客登录后浏览系统
2. 点击"注册"按钮
3. 选择角色并填写注册信息
4. 注册成功后，游客账号信息被清除
5. 以正式用户身份登录对应的系统

### 场景 3: Token 未过期的回访
1. 用户打开系统
2. 系统检查 token 未过期
3. 自动恢复用户信息
4. 跳转到上次关闭时的页面
5. 继续之前的操作

### 场景 4: Token 已过期的回访
1. 用户打开系统
2. 系统检查 token 已过期
3. 清除认证状态
4. 跳转到登录页
5. 用户需要重新登录

## 国际化支持

系统支持中文、英文、西班牙文三种语言：

### 游客相关文本
- 游客访问按钮
- 游客账号保存弹窗
- 游客模式提示信息
- 表单验证信息

### 语言切换
- 用户可以在任何页面切换语言
- 语言设置保存在 localStorage
- 切换语言后自动广播给所有微前端子应用

## 安全考虑

1. **Token 有效期**: 7 天后自动过期，需要重新登录
2. **游客权限**: 游客只能访问用户端和游客模式，无法访问其他角色的功能
3. **数据隔离**: 游客数据与正式用户数据分离
4. **账号转换**: 游客注册后，游客账号信息被清除

## 后端接口需求

### 创建游客账号
```typescript
POST /api/guest/create
Response: {
  guestAccount: {
    id: string
    username: string
    password: string
    createdAt: number
  },
  token: string
}
```

### 更新游客账号
```typescript
PUT /api/guest/update
Body: {
  username: string
  password: string
}
Response: {
  success: boolean
  account: GuestAccount
}
```

### Token 验证
```typescript
GET /api/auth/verify
Headers: {
  Authorization: Bearer <token>
}
Response: {
  valid: boolean
  userInfo: UserInfo
}
```

## 注意事项

1. **浏览器限制**: `beforeunload` 事件在某些浏览器中可能无法显示自定义弹窗
2. **数据持久化**: 游客数据仅存储在 localStorage，清除浏览器数据会丢失
3. **多标签页**: 多个标签页共享同一个游客账号
4. **隐私模式**: 隐私模式下关闭浏览器会清除所有数据

## 未来优化

1. 支持游客账号绑定邮箱或手机号
2. 游客数据云端备份
3. 游客行为分析和推荐
4. 游客转正式用户的数据迁移
5. 社交账号快速登录
