# 注册表单星号显示修复

## 问题描述

注册页面表单中同时显示了：
1. 红色星号（自定义的，在输入框内部左侧）
2. 灰色星号（来自 placeholder 文本）

需要保留红色星号，去掉灰色星号。

## 问题原因

灰色星号来自英文语言包中的 placeholder 文本，例如：
- `*Email`
- `*Password`
- `*Confirm password`
- `*Email verification code`

这些星号作为 placeholder 的一部分显示为灰色文字。

## 解决方案

### 1. 移除 placeholder 中的星号

修改了 `packages/main-web/src/locales/en.ts` 文件，将以下字段的星号移除：

**修改前：**
```typescript
email: '*Email',
password: '*Password',
confirmPassword: '*Confirm password',
emailCode: '*Email verification code',
```

**修改后：**
```typescript
email: 'Email',
password: 'Password',
confirmPassword: 'Confirm password',
emailCode: 'Email verification code',
```

### 2. 保留红色星号

红色星号通过 CSS 伪元素实现，位于输入框内部左侧：

```css
/* 为必填输入框添加红色星号标记 */
.register-form :deep(.required-field .el-input__wrapper::before) {
  content: '*';
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #f56c6c;
  font-size: 14px;
  z-index: 1;
  pointer-events: none;
}
```

### 3. 隐藏 Element Plus 默认星号

添加了 CSS 规则隐藏 Element Plus 表单项默认的星号：

```css
/* 隐藏 Element Plus 默认的灰色星号 */
.register-form :deep(.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before) {
  display: none;
}

.register-form :deep(.el-form-item.is-required .el-form-item__label::before) {
  display: none;
}
```

## 验证

修改后，注册页面表单应该：
- ✅ 在必填输入框内部左侧显示红色星号
- ✅ 不显示灰色的 placeholder 星号
- ✅ 不显示 Element Plus 默认的 label 星号

## 影响范围

- 仅影响主应用的注册页面（`packages/main-web/src/views/Auth/Register.vue`）
- 仅影响英文语言包（中文和西班牙语本来就没有星号）

## 注意事项

如果需要在其他表单中使用类似的星号样式：
1. 给表单项添加 `required-field` class
2. 确保 placeholder 文本中不包含星号
3. 应用相同的 CSS 样式
