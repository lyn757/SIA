# 游客访问功能测试指南

## 测试前准备

1. 确保项目已启动：
```bash
npm run dev
```

2. 清除浏览器缓存和 localStorage（可选，用于测试首次访问）

## 测试场景

### 场景 1: 直接访问用户端（游客自动创建）

**步骤：**
1. 打开浏览器，访问 `http://localhost:8080/user`
2. 观察是否自动创建游客账号并进入用户端

**预期结果：**
- 系统自动创建游客账号
- 显示成功消息
- 跳转到用户端页面
- localStorage 中存储了 `guestAccount`、`token`、`tokenExpiry`、`userInfo`

**验证方法：**
```javascript
// 在浏览器控制台执行
console.log('Guest Account:', localStorage.getItem('guestAccount'))
console.log('Token:', localStorage.getItem('token'))
console.log('User Info:', localStorage.getItem('userInfo'))
```

---

### 场景 2: 通过登录页游客入口访问

**步骤：**
1. 访问 `http://localhost:8080/login`
2. 点击"以游客身份访问"按钮
3. 观察页面跳转

**预期结果：**
- 显示"游客登录成功"消息
- 跳转到用户端 `/user`
- 创建游客账号信息

---

### 场景 3: 游客账号保存弹窗

**步骤：**
1. 以游客身份登录
2. 尝试关闭浏览器标签页或窗口
3. 观察是否弹出保存账号对话框

**预期结果：**
- 浏览器显示"确定要离开此页面吗？"的原生提示
- 如果取消离开，可能会显示自定义的保存账号弹窗

**注意：** 由于浏览器安全限制，`beforeunload` 事件可能无法显示自定义弹窗，只能显示浏览器原生提示。

**替代测试方法：**
1. 以游客身份登录
2. 切换到其他标签页（触发 `visibilitychange` 事件）
3. 观察是否显示保存账号弹窗

---

### 场景 4: 修改游客账号信息

**步骤：**
1. 触发保存账号弹窗（通过切换标签页）
2. 修改用户名为 "TestUser"
3. 修改密码为 "test123456"
4. 点击"保存账号"按钮

**预期结果：**
- 显示"账号保存成功"消息
- localStorage 中的 `guestAccount` 更新为新的用户名和密码
- `userInfo` 中的 username 也更新

**验证方法：**
```javascript
const guestAccount = JSON.parse(localStorage.getItem('guestAccount'))
console.log('Updated Username:', guestAccount.username) // 应该是 "TestUser"
console.log('Updated Password:', guestAccount.password) // 应该是 "test123456"
```

---

### 场景 5: 取消保存游客账号

**步骤：**
1. 触发保存账号弹窗
2. 点击"不需要"按钮

**预期结果：**
- 弹窗关闭
- 清除游客账号信息
- 退出登录，跳转到登录页
- localStorage 中的 `guestAccount`、`token`、`userInfo` 被清除

**验证方法：**
```javascript
console.log('Guest Account:', localStorage.getItem('guestAccount')) // 应该是 null
console.log('Token:', localStorage.getItem('token')) // 应该是 null
```

---

### 场景 6: Token 未过期的回访

**步骤：**
1. 以游客身份登录并访问某个页面（如 `/user`）
2. 关闭浏览器标签页（不清除缓存）
3. 重新打开浏览器，访问 `http://localhost:8080`

**预期结果：**
- 系统检查 token 未过期
- 自动恢复用户信息
- 跳转到上次访问的页面 `/user`
- 无需重新登录

**验证方法：**
```javascript
// 检查 token 过期时间
const expiry = localStorage.getItem('tokenExpiry')
const now = Date.now()
console.log('Token expires in:', (parseInt(expiry) - now) / 1000 / 60, 'minutes')
```

---

### 场景 7: Token 已过期的回访

**步骤：**
1. 以游客身份登录
2. 手动修改 token 过期时间为过去的时间：
```javascript
localStorage.setItem('tokenExpiry', '0')
```
3. 刷新页面

**预期结果：**
- 系统检查 token 已过期
- 清除认证状态
- 跳转到登录页
- 需要重新登录

---

### 场景 8: 游客注册成为正式用户

**步骤：**
1. 以游客身份登录
2. 点击"注册"按钮或访问 `/register`
3. 选择角色（如"用户"）
4. 填写注册信息
5. 提交注册

**预期结果：**
- 注册成功
- 游客账号信息被清除
- 以正式用户身份登录
- 跳转到对应角色的系统

**验证方法：**
```javascript
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log('Is Guest:', userInfo.isGuest) // 应该是 false 或 undefined
console.log('Roles:', userInfo.roles) // 应该包含选择的角色
```

---

### 场景 9: 正式用户登录

**步骤：**
1. 访问登录页
2. 选择角色（如"设计师"）
3. 输入用户名和密码
4. 点击"登录"按钮

**预期结果：**
- 登录成功
- 跳转到对应角色的系统（如 `/designer`）
- Token 有效期 7 天
- 记录最后访问的路由

---

### 场景 10: 多语言切换

**步骤：**
1. 在任意页面切换语言（中文/英文/西班牙文）
2. 观察游客相关文本是否正确显示

**预期结果：**
- 所有游客相关文本正确翻译
- 保存账号弹窗文本正确显示
- 登录页"以游客身份访问"按钮文本正确

**测试文本：**
- 中文: "以游客身份访问"
- 英文: "Access as Guest"
- 西班牙文: "Acceder como Invitado"

---

## 调试技巧

### 查看 localStorage 数据
```javascript
// 查看所有存储的数据
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  console.log(key, ':', localStorage.getItem(key))
}
```

### 清除所有数据
```javascript
localStorage.clear()
location.reload()
```

### 手动创建游客账号（用于测试）
```javascript
const guestAccount = {
  id: 'guest_test',
  username: 'TestGuest',
  password: 'test123',
  createdAt: Date.now()
}
localStorage.setItem('guestAccount', JSON.stringify(guestAccount))
```

### 检查 token 状态
```javascript
const token = localStorage.getItem('token')
const expiry = localStorage.getItem('tokenExpiry')
const now = Date.now()

console.log('Token:', token)
console.log('Expires at:', new Date(parseInt(expiry)))
console.log('Is expired:', now > parseInt(expiry))
console.log('Time remaining:', (parseInt(expiry) - now) / 1000 / 60, 'minutes')
```

---

## 常见问题

### Q1: 保存账号弹窗不显示？
**A:** 由于浏览器安全限制，`beforeunload` 事件可能无法显示自定义弹窗。尝试通过切换标签页触发 `visibilitychange` 事件。

### Q2: Token 过期时间不正确？
**A:** 检查系统时间是否正确，token 过期时间是基于客户端时间计算的。

### Q3: 游客账号信息丢失？
**A:** 检查是否清除了浏览器缓存或使用了隐私模式。

### Q4: 路由跳转不正确？
**A:** 检查路由守卫逻辑和权限配置，确保游客拥有 `['guest', 'user']` 角色。

### Q5: 国际化文本不显示？
**A:** 检查语言文件是否正确加载，确保所有语言文件都包含相应的文本键。

---

## 性能测试

### 测试指标
1. 游客账号创建时间 < 100ms
2. 页面跳转时间 < 500ms
3. 弹窗显示时间 < 200ms
4. Token 验证时间 < 50ms

### 测试方法
```javascript
// 测试游客账号创建时间
console.time('createGuestAccount')
await authStore.createGuestAccount()
console.timeEnd('createGuestAccount')

// 测试 token 验证时间
console.time('tokenVerify')
await authStore.initializeAuth()
console.timeEnd('tokenVerify')
```

---

## 安全测试

### 测试项
1. ✓ Token 过期后无法访问受保护路由
2. ✓ 游客无法访问其他角色的系统
3. ✓ 游客数据与正式用户数据隔离
4. ✓ 注册后游客账号信息被清除
5. ✓ Token 存储在 localStorage（考虑使用 httpOnly cookie）

---

## 测试清单

- [ ] 场景 1: 直接访问用户端
- [ ] 场景 2: 通过登录页游客入口访问
- [ ] 场景 3: 游客账号保存弹窗
- [ ] 场景 4: 修改游客账号信息
- [ ] 场景 5: 取消保存游客账号
- [ ] 场景 6: Token 未过期的回访
- [ ] 场景 7: Token 已过期的回访
- [ ] 场景 8: 游客注册成为正式用户
- [ ] 场景 9: 正式用户登录
- [ ] 场景 10: 多语言切换
- [ ] 性能测试
- [ ] 安全测试

---

## 测试报告模板

```
测试日期: ____________________
测试人员: ____________________
浏览器: ____________________
操作系统: ____________________

| 场景 | 状态 | 备注 |
|------|------|------|
| 场景 1 | ✓/✗ |      |
| 场景 2 | ✓/✗ |      |
| 场景 3 | ✓/✗ |      |
| 场景 4 | ✓/✗ |      |
| 场景 5 | ✓/✗ |      |
| 场景 6 | ✓/✗ |      |
| 场景 7 | ✓/✗ |      |
| 场景 8 | ✓/✗ |      |
| 场景 9 | ✓/✗ |      |
| 场景 10 | ✓/✗ |      |

发现的问题:
1. 
2. 
3. 

建议改进:
1. 
2. 
3. 
```
