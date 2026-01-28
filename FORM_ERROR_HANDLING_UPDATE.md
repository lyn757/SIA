# 表单错误处理样式更新

## 更新日期
2026-01-28

## 更新内容

### 1. 隐藏错误提示文字
- 隐藏 Element Plus 默认的错误提示消息文字
- 避免错误提示遮盖下方的协议和登录链接文字

### 2. 添加错误状态红色边框
- 输入框错误时显示红色边框 (#f56c6c)
- 文本域错误时显示红色边框
- 复选框错误时显示红色边框

### 3. 添加抖动动画
- 当表单验证失败时，错误的输入框会执行抖动动画
- 动画持续时间：0.5秒
- 抖动幅度：左右各 4px
- 提供视觉反馈，提示用户输入有误

### 4. 协议和登录链接样式
- 字体：Inter
- 字重：400
- 字号：14px (0.875rem)
- 行高：18px (1.125rem)
- 字间距：0
- 链接颜色：#00699A
- 链接文字与前后文字底部对齐 (vertical-align: baseline)

## 技术实现

### CSS 样式
```css
/* 隐藏错误提示文字 */
.register-form :deep(.el-form-item__error) {
  display: none;
}

/* 错误状态红色边框 */
.register-form :deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}

/* 抖动动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.register-form :deep(.el-form-item.is-error .el-input__wrapper) {
  animation: shake 0.5s;
}
```

## 用户体验改进
1. 页面布局更加整洁，不会因为错误提示而导致布局跳动
2. 通过红色边框和抖动动画提供清晰的错误反馈
3. 协议和登录链接文字不会被错误提示遮盖
4. 视觉反馈更加直观和友好

## 影响文件
- `SIA-clone/packages/main-web/src/views/Auth/Register.vue`
