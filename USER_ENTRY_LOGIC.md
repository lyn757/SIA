# 用户进入系统逻辑说明

## 概述
本文档说明了用户进入系统时的路由和认证逻辑。

## 用户进入场景

### 1. 未注册/未登录用户（首次访问）
**行为：** 以游客身份自动进入C端用户首页

**流程：**
1. 用户访问 `http://localhost:8080/`
2. 系统检测到没有token
3. 自动生成游客ID（格式：`guest_xxxxxxxxx`）
4. 保存游客ID到localStorage（`guestId`）
5. 生成游客token
6. 自动跳转到 `/user`（C端首页）

**后端对接：**
- 后端需要为游客ID分配临时账号
- 游客ID会在localStorage中持久化保存

### 2. 游客用户（再次访问）
**行为：** 使用相同的游客身份进入C端首页

**流程：**
1. 用户访问 `http://localhost:8080/`
2. 系统检测到localStorage中有 `guestId`
3. 复用已有的游客ID
4. 生成新的游客token
5. 自动跳转到 `/user`（C端首页）

**特点：**
- 游客ID会一直保留，直到用户注册登录
- 每次访问都会生成新的token，但使用相同的游客ID

### 3. 已登录用户（token有效）
**行为：** 直接进入上次关闭时的角色系统

**流程：**
1. 用户访问 `http://localhost:8080/`
2. 系统检测到有效的token
3. 读取 `lastActiveRole`（上次活跃的角色）
4. 自动跳转到对应的角色系统：
   - `designer` → `/designer`
   - `supplier` → `/supplier`
   - `contractor` → `/contractor`
   - `user` → `/user`

**特点：**
- token有效期为7天（可在 `auth.ts` 配置）
- 系统会记住用户上次访问的角色端

### 4. 已注册但未登录用户
**行为：** 进入主应用登录页

**流程：**
1. 用户访问 `http://localhost:8080/`
2. 系统检测到没有有效token
3. 跳转到 `/login`（主应用登录页）

### 5. Token过期用户
**行为：** 进入主应用登录页

**流程：**
1. 用户访问 `http://localhost:8080/`
2. 系统检测到token已过期
3. 清除过期的认证信息
4. 跳转到 `/login`（主应用登录页）

**特点：**
- 保留 `lastActiveRole`，登录后可跳转到上次的角色端
- 保留 `guestId`（如果之前是游客）

## 路由守卫逻辑

### 访问根路径 (`/` 或 `/dashboard`)
```
if (有token && token有效) {
  → 跳转到上次活跃的角色页面
} else if (有token && token过期) {
  → 清除认证信息 → 跳转到登录页
} else {
  → 游客自动登录 → 跳转到C端首页
}
```

### 访问登录/注册页面 (`/login` 或 `/register`)
```
→ 直接允许访问
```

### 访问C端用户页面 (`/user`)
```
if (没有token) {
  → 游客自动登录 → 允许访问
} else if (token过期) {
  → 清除认证信息 → 游客自动登录 → 允许访问
} else {
  → 允许访问
}
```

### 访问其他受保护路由 (`/designer`, `/supplier`, `/contractor`)
```
if (未登录 || token过期) {
  → 清除认证信息 → 跳转到登录页
} else if (没有权限) {
  → 跳转到有权限的默认页面
} else {
  → 允许访问 → 更新lastActiveRole
}
```

## LocalStorage 数据说明

### 游客相关
- `guestId`: 游客唯一标识，首次访问时生成，持久保存
- `token`: 当前会话token（游客或注册用户）
- `userInfo`: 用户信息（包含角色等）
- `tokenExpireTime`: token过期时间戳

### 用户偏好
- `lastActiveRole`: 上次活跃的角色（designer/supplier/contractor/user）
- `locale`: 语言设置

## 注册登录后的变化

### 游客转正式用户
当游客注册并登录后：
1. 清除 `guestId`（表示已转为正式用户）
2. 保存正式用户的token和userInfo
3. 下次访问时不再以游客身份进入

### 正式用户登出
当正式用户登出后：
1. 清除token、userInfo、tokenExpireTime
2. 保留lastActiveRole（记住上次角色）
3. 不清除guestId（如果之前有）
4. 下次访问时：
   - 如果有guestId → 以游客身份进入C端
   - 如果没有guestId → 生成新游客ID，进入C端

## 测试场景

### 场景1：首次访问
1. 清空localStorage
2. 访问 `http://localhost:8080/`
3. 预期：自动跳转到 `/user`，localStorage中有 `guestId`

### 场景2：游客再次访问
1. 保持localStorage中的 `guestId`
2. 清除 `token`
3. 访问 `http://localhost:8080/`
4. 预期：使用相同的 `guestId`，跳转到 `/user`

### 场景3：注册并登录
1. 从C端点击注册/登录
2. 完成注册登录流程
3. 预期：`guestId` 被清除，有新的 `token` 和 `userInfo`

### 场景4：已登录用户再次访问
1. 保持有效的 `token`
2. 访问 `http://localhost:8080/`
3. 预期：跳转到 `lastActiveRole` 对应的页面

### 场景5：Token过期
1. 修改 `tokenExpireTime` 为过去的时间
2. 访问 `http://localhost:8080/`
3. 预期：跳转到 `/login`

## 配置说明

### Token有效期配置
文件：`packages/main-web/src/config/auth.ts`

```typescript
export const AUTH_CONFIG = {
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 7天
  
  SESSION_DURATIONS: {
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
    ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
    // ...
  }
}
```

### 游客配置
```typescript
GUEST_CONFIG: {
  DEFAULT_ROLE: 'user',           // 游客默认进入的角色端
  TOKEN_PREFIX: 'guest-token-',   // 游客token前缀
  USERNAME_PREFIX: 'guest_'       // 游客用户名前缀
}
```

## 后端对接要点

1. **游客ID管理**
   - 前端会发送 `guestId` 给后端
   - 后端需要为每个 `guestId` 分配临时账号
   - 游客数据需要持久化，以便下次访问时恢复

2. **游客转正式用户**
   - 当游客注册时，需要将游客数据迁移到正式账号
   - 前端会在注册成功后清除 `guestId`

3. **Token验证**
   - 后端需要验证token的有效性
   - 返回token过期信息，前端会自动处理

4. **角色权限**
   - 游客角色：只能访问C端（`/user`）
   - 其他角色：根据权限访问对应的系统
