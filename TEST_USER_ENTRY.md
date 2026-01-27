# 用户进入逻辑测试指南

## 快速测试步骤

### 测试1：首次访问（游客模式）

1. **清空浏览器数据**
   ```javascript
   // 在浏览器控制台执行
   localStorage.clear()
   ```

2. **访问应用**
   - 打开 `http://localhost:8080/`

3. **预期结果**
   - 自动跳转到 `/user`（C端首页）
   - 控制台显示：`首次访问，生成新游客ID: guest_xxxxxxxxx`
   - localStorage中有以下数据：
     ```javascript
     localStorage.getItem('guestId')        // guest_xxxxxxxxx
     localStorage.getItem('token')          // guest-token-xxxxxxxxx
     localStorage.getItem('userInfo')       // {"id":"guest_xxx",...}
     localStorage.getItem('lastActiveRole') // user
     ```

---

### 测试2：游客再次访问

1. **保留localStorage，刷新页面**
   - 按 F5 或刷新浏览器

2. **预期结果**
   - 仍然在 `/user`（C端首页）
   - 控制台显示：`复用已有游客ID: guest_xxxxxxxxx`
   - `guestId` 保持不变
   - `token` 会更新（新的时间戳）

---

### 测试3：游客访问受保护路由

1. **手动访问其他路由**
   - 在地址栏输入 `http://localhost:8080/designer`

2. **预期结果**
   - 自动跳转到 `/login`（登录页）
   - 控制台显示：`访问受保护路由，需要登录`

---

### 测试4：注册并登录

1. **从登录页进行登录**
   - 访问 `/login`
   - 输入用户名、密码，选择角色
   - 点击登录

2. **预期结果**
   - 登录成功后跳转到对应角色页面
   - localStorage中：
     - `guestId` 被清除
     - `token` 更新为正式用户token
     - `userInfo` 更新为正式用户信息
     - `lastActiveRole` 更新为登录的角色

---

### 测试5：已登录用户再次访问

1. **保持登录状态，关闭浏览器**
   - 关闭浏览器标签页

2. **重新打开浏览器，访问应用**
   - 打开 `http://localhost:8080/`

3. **预期结果**
   - 自动跳转到上次的角色页面（如 `/designer`）
   - 控制台显示：`已登录用户，跳转到上次角色页面: /designer`
   - 不需要重新登录

---

### 测试6：Token过期

1. **手动修改token过期时间**
   ```javascript
   // 在浏览器控制台执行
   localStorage.setItem('tokenExpireTime', Date.now() - 1000)
   ```

2. **刷新页面**
   - 按 F5

3. **预期结果**
   - 自动跳转到 `/login`
   - 控制台显示：`Token已过期，跳转到登录页`
   - token和userInfo被清除
   - `lastActiveRole` 保留

---

### 测试7：登出后再次访问

1. **登出**
   - 点击登出按钮（如果有）
   - 或在控制台执行：
     ```javascript
     // 假设已经有authStore实例
     authStore.logout(false)
     ```

2. **访问应用**
   - 打开 `http://localhost:8080/`

3. **预期结果**
   - 如果之前有 `guestId`：以游客身份进入 `/user`
   - 如果没有 `guestId`：生成新游客ID，进入 `/user`

---

## 调试技巧

### 查看当前认证状态
```javascript
// 在浏览器控制台执行
console.log({
  guestId: localStorage.getItem('guestId'),
  token: localStorage.getItem('token'),
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  lastActiveRole: localStorage.getItem('lastActiveRole'),
  tokenExpireTime: new Date(Number(localStorage.getItem('tokenExpireTime'))).toLocaleString()
})
```

### 模拟不同场景

#### 模拟首次访问
```javascript
localStorage.clear()
location.reload()
```

#### 模拟游客再次访问
```javascript
localStorage.removeItem('token')
localStorage.removeItem('userInfo')
localStorage.removeItem('tokenExpireTime')
// 保留 guestId
location.reload()
```

#### 模拟token过期
```javascript
localStorage.setItem('tokenExpireTime', Date.now() - 1000)
location.reload()
```

#### 模拟已登录用户
```javascript
localStorage.setItem('token', 'mock-token-' + Date.now())
localStorage.setItem('userInfo', JSON.stringify({
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  roles: ['designer']
}))
localStorage.setItem('tokenExpireTime', Date.now() + 7 * 24 * 60 * 60 * 1000)
localStorage.setItem('lastActiveRole', 'designer')
location.reload()
```

---

## 常见问题

### Q1: 为什么每次刷新都生成新的游客ID？
A: 检查localStorage中是否正确保存了 `guestId`。如果没有，可能是浏览器隐私模式或localStorage被禁用。

### Q2: 登录后为什么还是游客身份？
A: 检查登录逻辑是否正确清除了 `guestId`。登录成功后应该执行：
```javascript
localStorage.removeItem('guestId')
```

### Q3: Token过期后为什么没有跳转到登录页？
A: 检查 `tokenExpireTime` 是否正确设置。可以在控制台查看：
```javascript
console.log(new Date(Number(localStorage.getItem('tokenExpireTime'))))
```

### Q4: 如何修改token有效期？
A: 修改 `packages/main-web/src/config/auth.ts` 中的 `SESSION_DURATION`：
```typescript
SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 改为你需要的时间
```

---

## 启动应用

### 启动主应用
```bash
cd packages/main-web
npm run dev
```

### 启动C端用户应用
```bash
cd packages/user-web
npm run dev
```

### 启动其他微应用（可选）
```bash
# Designer端
cd packages/designer-web
npm run dev

# Supplier端
cd packages/supplier-web
npm run dev

# Contractor端
cd packages/contractor-web
npm run dev
```

---

## 验证清单

- [ ] 首次访问自动进入C端首页
- [ ] 游客ID被正确保存和复用
- [ ] 游客无法访问其他受保护路由
- [ ] 注册登录后清除游客ID
- [ ] 已登录用户再次访问进入上次角色页面
- [ ] Token过期后跳转到登录页
- [ ] 登出后保留lastActiveRole
- [ ] 路由守卫正确拦截未授权访问
