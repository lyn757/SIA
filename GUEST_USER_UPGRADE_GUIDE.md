# 游客用户升级功能说明

## 功能概述

当用户以游客身份登录用户端（user-web）时，在用户头像下拉菜单中会显示"成为正式用户"的菜单项，点击后会跳转到主应用的注册页面（Register）。

## 实现细节

### 1. 用户识别

系统通过 `isGuest` 标识来判断当前用户是否为游客：

```typescript
// 从用户信息中获取
isGuest.value = parentUserInfo.value?.isGuest || false
```

### 2. 菜单显示

在 `UserAvatar.vue` 组件中，只有当 `isGuest` 为 `true` 时才显示"成为正式用户"菜单项：

```vue
<li v-if="isGuest">
  <hr class="dropdown-divider">
</li>
<li v-if="isGuest">
  <a href="javascript:void(0)" @click.prevent="handleUpgrade" class="dropdown-item text-primary">
    <i class="bi bi-person-plus me-2"></i>{{ $t('nav.upgradeAccount') }}
  </a>
</li>
```

### 3. 跳转逻辑

点击"成为正式用户"后，会调用 `handleUpgrade` 方法：

```typescript
const handleUpgrade = () => {
  console.log('Upgrading to full account...')
  navigation.toRegister()
}
```

这会通过 `postMessage` 向主应用发送导航消息：

```typescript
window.parent.postMessage({
  type: 'NAVIGATE',
  path: '/register',
  replace: false
}, '*')
```

### 4. 主应用处理

主应用的 `App.vue` 监听来自子应用的消息并处理导航：

```typescript
const handleMessage = (event: MessageEvent) => {
  if (event.data && typeof event.data === 'object') {
    const { type, path, replace } = event.data
    
    if (type === 'NAVIGATE' && path) {
      if (replace) {
        router.replace(path)
      } else {
        router.push(path)
      }
    }
  }
}

window.addEventListener('message', handleMessage)
```

## 国际化支持

该功能支持多语言：

- **中文**: "成为正式用户"
- **英文**: "Become a Full Member"
- **西班牙语**: "Convertirse en Miembro Completo"

翻译键：`nav.upgradeAccount`

## 测试步骤

1. 以游客身份登录用户端（http://localhost:8084/）
2. 点击右上角的用户头像
3. 在下拉菜单中应该能看到"成为正式用户"选项
4. 点击该选项
5. 应该会跳转到主应用的注册页面（http://localhost:8080/register）

## 相关文件

- `packages/user-web/src/components/UserAvatar.vue` - 用户头像组件
- `packages/user-web/src/utils/navigation.ts` - 跨应用导航工具
- `packages/user-web/src/plugins/i18n.ts` - 国际化配置
- `packages/main-web/src/App.vue` - 主应用入口（消息监听）

## 注意事项

1. 该功能仅在微前端环境中有效（子应用嵌入主应用时）
2. 如果独立运行用户端，会使用 `window.location.href` 进行跳转
3. 游客状态由后端 API 返回的用户信息中的 `isGuest` 字段决定
