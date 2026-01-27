# 快速测试指南

## 测试新功能

### 准备工作
项目已启动，访问地址：
- 主应用：http://localhost:8080/
- 用户端：http://localhost:8084/

### 测试步骤

#### 测试1：游客自动登录
1. 打开浏览器开发者工具（F12）
2. 清除 localStorage：
   ```javascript
   localStorage.clear()
   ```
3. 访问 http://localhost:8080/
4. **预期结果**：
   - 自动跳转到 `/user` 页面
   - localStorage 中出现游客账号信息
   - 控制台显示 "游客自动登录成功"

#### 测试2：记住上次角色
1. 在浏览器中访问 http://localhost:8080/login
2. 登录一个设计师账号（选择 designer 角色）
3. 登录后访问 http://localhost:8080/designer
4. 关闭浏览器标签页
5. 重新打开浏览器，访问 http://localhost:8080/
6. **预期结果**：
   - 自动跳转到 `/designer` 页面
   - 无需重新登录

#### 测试3：Token过期处理
1. 打开浏览器开发者工具
2. 在控制台执行：
   ```javascript
   // 设置token为过期状态
   localStorage.setItem('tokenExpireTime', '0')
   ```
3. 刷新页面
4. **预期结果**：
   - 控制台显示 "Token已过期，清除认证信息"
   - 自动执行游客登录
   - 跳转到 `/user` 页面

#### 测试4：会话保持时间
1. 登录系统
2. 查看 localStorage 中的 `tokenExpireTime`：
   ```javascript
   const expireTime = localStorage.getItem('tokenExpireTime')
   const expireDate = new Date(Number(expireTime))
   console.log('Token过期时间:', expireDate)
   ```
3. **预期结果**：
   - 过期时间应该是当前时间 + 7天

### 查看控制台日志

在浏览器控制台中，你会看到以下关键日志：

```
认证状态初始化完成: {
  isAuthenticated: true/false,
  userInfo: {...},
  lastActiveRole: "user"
}

路由守卫: {
  to: "/user",
  isAuthenticated: true,
  userRoles: ["guest"],
  routeMeta: {...}
}

游客自动登录成功: {
  id: "guest_abc123",
  username: "guest_abc123",
  ...
}
```

### 检查 localStorage

打开开发者工具 → Application → Local Storage → http://localhost:8080

应该看到以下键值：
- `token`: 认证令牌
- `userInfo`: 用户信息（JSON字符串）
- `tokenExpireTime`: Token过期时间戳
- `lastActiveRole`: 最后活跃的角色

### 修改会话时间

如果需要修改会话保持时间，编辑文件：
`packages/main-web/src/config/auth.ts`

```typescript
export const AUTH_CONFIG = {
  // 修改这里，例如改为1天
  SESSION_DURATION: 1 * 24 * 60 * 60 * 1000,
  
  // 或使用预设值
  SESSION_DURATION: AUTH_CONFIG.SESSION_DURATIONS.ONE_DAY,
}
```

保存后，Vite 会自动热更新。

## 常见问题

### Q: 游客登录后能访问其他角色页面吗？
A: 不能。游客只能访问 `/user` 路径，访问其他路径会被重定向回 `/user`。

### Q: 如何切换到正式用户？
A: 访问 `/login` 或 `/register` 页面进行登录或注册。

### Q: lastActiveRole 什么时候更新？
A: 每次访问不同角色的页面时自动更新（/designer, /supplier, /contractor, /user）。

### Q: Token过期后 lastActiveRole 会丢失吗？
A: 不会。Token过期只清除认证信息，lastActiveRole 会保留，用于下次登录后的跳转。

## 调试技巧

### 查看当前认证状态
在浏览器控制台执行：
```javascript
// 查看所有localStorage数据
console.table(localStorage)

// 查看用户信息
console.log(JSON.parse(localStorage.getItem('userInfo')))

// 查看token是否过期
const expireTime = Number(localStorage.getItem('tokenExpireTime'))
console.log('Token是否有效:', Date.now() < expireTime)
console.log('剩余时间（天）:', (expireTime - Date.now()) / (24 * 60 * 60 * 1000))
```

### 强制重新游客登录
```javascript
localStorage.clear()
location.reload()
```

### 模拟不同角色
```javascript
// 模拟设计师
localStorage.setItem('lastActiveRole', 'designer')
location.href = '/'

// 模拟供应商
localStorage.setItem('lastActiveRole', 'supplier')
location.href = '/'
```
