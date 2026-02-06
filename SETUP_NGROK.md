# 使用 ngrok 创建无密码公网访问

## 为什么选择 ngrok？
- ✅ 无需密码验证，直接访问
- ✅ 更稳定的连接
- ✅ 更快的速度
- ✅ 免费版本足够使用

## 快速安装步骤

### 方法 1: 使用 Chocolatey（推荐）
```cmd
choco install ngrok
```

### 方法 2: 手动下载
1. 访问 https://ngrok.com/download
2. 下载 Windows 版本
3. 解压到任意目录（如 C:\ngrok）
4. 将该目录添加到系统 PATH

### 方法 3: 使用 Scoop
```cmd
scoop install ngrok
```

## 注册账号（免费）
1. 访问 https://dashboard.ngrok.com/signup
2. 注册免费账号
3. 获取 authtoken
4. 运行命令配置：
```cmd
ngrok config add-authtoken YOUR_TOKEN_HERE
```

## 启动隧道
安装完成后，在 Kiro 中告诉我，我会帮你启动 ngrok 隧道。

---

## 当前使用的 localtunnel
如果不想安装 ngrok，当前的 localtunnel 也可以使用：
- 链接: https://siaproject2026.loca.lt
- 密码: 116.248.94.244
- 只需要输入一次密码，之后浏览器会记住
