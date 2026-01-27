# 会话管理功能实现总结

## 实现的功能

### ✅ 1. 游客自动登录
- 未登录用户访问项目时，自动分配随机游客账号
- 游客账号格式：`guest_xxxxxxx`
- 自动进入C端用户首页（`/user`）
- 游客权限受限，只能访问用户端

### ✅ 2. 记住上次角色
- 用户访问不同角色页面时，系统自动记录
- 关闭浏览器后再次访问，自动跳转到上次的角色页面
- 支持的角色：designer、supplier、contractor、user
- 使用 localStorage 持久化存储

### ✅ 3. 会话保持时间
- 默认会话时间：**7天**
- Token过期自动检查和清理
- 可配置的会话时长（1小时到30天）
- 过期后自动执行游客登录

## 修改的文件

### 核心文件
1. **packages/main-web/src/stores/auth.ts**
   - 添加 `tokenExpireTime`、`lastActiveRole` 状态
   - 实现 `guestAutoLogin()` 游客自动登录
   - 实现 `isTokenValid` Token有效性检查
   - 实现 `updateLastActiveRole()` 更新最后角色
   - 实现 `getLastActiveRoutePath()` 获取角色路径
   - 修改 `login()` 添加Token过期时间设置
   - 修改 `logout()` 支持不跳转参数

2. **packages/main-web/src/router/index.ts**
   - 重写路由守卫逻辑
   - 添加根路径自动重定向
   - 添加游客自动登录触发
   - 添加角色记录更新
   - 优化权限检查流程

3. **packages/main-web/src/main.ts**
   - 优化认证初始化流程
   - 添加认证状态日志输出

### 新增文件
4. **packages/main-web/src/config/auth.ts**
   - 会话时间配置
   - 游客配置
   - 角色路径映射
   - 预设时间选项

### 文档文件
5. **AUTO_LOGIN_AND_SESSION_GUIDE.md** - 详细功能说明
6. **QUICK_TEST_GUIDE.md** - 快速测试指南
7. **SESSION_MANAGEMENT_SUMMARY.md** - 本文件

## 技术要点

### LocalStorage 数据结构
```javascript
{
  token: "guest-token-1234567890",
  userInfo: "{...}",
  tokenExpireTime: "1738281600000",
  lastActiveRole: "user"
}
```

### 路由守卫流程
```
访问路径 → 检查根路径 → 检查认证状态 → 
已登录：跳转到上次角色页面
未登录：游客自动登录 → 跳转到/user
```

### Token过期检查
```typescript
const isTokenValid = computed(() => {
  if (!token.value || !tokenExpireTime.value) return false
  return Date.now() < tokenExpireTime.value
})
```

## 配置说明

### 修改会话时间
编辑 `packages/main-web/src/config/auth.ts`：

```typescript
export const AUTH_CONFIG = {
  // 方式1：直接修改
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000,
  
  // 方式2：使用预设值
  SESSION_DURATION: SESSION_DURATIONS.ONE_DAY,
}
```

可选时长：
- ONE_HOUR: 1小时
- ONE_DAY: 1天
- THREE_DAYS: 3天
- ONE_WEEK: 7天（默认）
- TWO_WEEKS: 14天
- ONE_MONTH: 30天

### 修改游客默认页面
```typescript
GUEST_CONFIG: {
  DEFAULT_ROLE: 'user', // 改为其他角色
}
```

## 使用场景

### 场景1：新用户首次访问
```
访问 http://localhost:8080/
  ↓
系统检测未登录
  ↓
自动创建游客账号
  ↓
跳转到 /user（C端首页）
```

### 场景2：老用户再次访问
```
访问 http://localhost:8080/
  ↓
系统检测已登录且Token有效
  ↓
读取 lastActiveRole = 'designer'
  ↓
跳转到 /designer
```

### 场景3：Token过期
```
访问 http://localhost:8080/
  ↓
系统检测Token已过期
  ↓
清除认证信息（保留lastActiveRole）
  ↓
执行游客自动登录
  ↓
跳转到 /user
```

## 测试方法

### 快速测试
```javascript
// 1. 清除所有数据
localStorage.clear()
location.reload()

// 2. 查看认证状态
console.table(localStorage)

// 3. 模拟Token过期
localStorage.setItem('tokenExpireTime', '0')
location.reload()

// 4. 切换角色
localStorage.setItem('lastActiveRole', 'designer')
location.href = '/'
```

详细测试步骤请参考 `QUICK_TEST_GUIDE.md`

## 注意事项

1. **游客权限**：游客只能访问 `/user` 路径
2. **Token过期**：过期后保留 `lastActiveRole`，用于下次登录后跳转
3. **角色切换**：访问不同角色页面时自动更新记录
4. **会话时间**：建议不超过30天，根据安全需求调整
5. **热更新**：修改配置文件后 Vite 会自动重载

## 后续优化建议

1. **后端集成**：
   - 将游客账号创建逻辑移到后端
   - 实现真实的Token刷新机制
   - 添加Token续期功能

2. **安全增强**：
   - 添加Token加密
   - 实现设备指纹验证
   - 添加异常登录检测

3. **用户体验**：
   - 添加Token即将过期提醒
   - 实现静默刷新Token
   - 添加"记住我"选项（更长会话时间）

4. **监控统计**：
   - 记录游客转化率
   - 统计用户活跃时间
   - 分析角色切换频率

## 项目状态

✅ 功能已完整实现
✅ 代码无语法错误
✅ 项目正常运行
✅ 支持热更新

可以直接访问 http://localhost:8080/ 进行测试！
