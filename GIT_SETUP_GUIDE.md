# Git 安装和初始化指南

## 第一步：安装 Git

### Windows 系统

#### 方法 1: 官方安装程序（推荐）
1. 访问 https://git-scm.com/download/win
2. 下载并运行安装程序
3. 安装过程中使用默认设置即可

#### 方法 2: Winget
```bash
winget install --id Git.Git -e --source winget
```

#### 方法 3: Chocolatey
```bash
choco install git
```

### 验证安装
打开命令提示符或 PowerShell：
```bash
git --version
```

应该显示版本号，例如：`git version 2.43.0.windows.1`

---

## 第二步：配置 Git

安装后首次使用需要配置用户信息：

```bash
# 设置用户名
git config --global user.name "你的名字"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

---

## 第三步：初始化项目仓库

在项目根目录（D:\soft-deco-pc）执行：

```bash
# 初始化 Git 仓库
git init

# 查看状态
git status
```

---

## 第四步：创建 .gitignore 文件

在项目根目录创建 `.gitignore` 文件，内容如下：

```
# 依赖
node_modules/
.pnp
.pnp.js

# 测试
coverage/

# 生产构建
dist/
build/
*.local

# 环境变量
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# 日志
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# 编辑器
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# 系统文件
Thumbs.db
.DS_Store

# 临时文件
*.tmp
*.temp
.cache/
```

---

## 第五步：首次提交

```bash
# 添加所有文件到暂存区
git add .

# 查看将要提交的文件
git status

# 创建首次提交
git commit -m "Initial commit: 微前端项目初始化"

# 查看提交历史
git log --oneline
```

---

## 第六步：查看文件历史（恢复被覆盖的文件）

如果你之前已经提交过代码，可以查看文件历史：

```bash
# 查看 Shop.vue 的修改历史
git log --oneline -- packages/user-web/src/views/Shop.vue

# 查看某次提交的内容
git show <commit-hash>:packages/user-web/src/views/Shop.vue

# 恢复到之前的版本
git checkout <commit-hash> -- packages/user-web/src/views/Shop.vue
```

---

## 常用 Git 命令

### 查看状态和历史
```bash
# 查看当前状态
git status

# 查看提交历史
git log
git log --oneline
git log --graph --oneline --all

# 查看某个文件的历史
git log -- path/to/file

# 查看文件的修改内容
git diff path/to/file
```

### 撤销和恢复
```bash
# 撤销工作区的修改（未 add）
git checkout -- path/to/file

# 撤销暂存区的修改（已 add，未 commit）
git reset HEAD path/to/file

# 查看某个提交的文件内容
git show commit-hash:path/to/file

# 恢复文件到某个提交的状态
git checkout commit-hash -- path/to/file
```

### 分支管理
```bash
# 查看分支
git branch

# 创建分支
git branch feature-name

# 切换分支
git checkout feature-name

# 创建并切换分支
git checkout -b feature-name

# 合并分支
git merge feature-name

# 删除分支
git branch -d feature-name
```

---

## 针对当前项目的建议

### 1. 立即初始化 Git
```bash
cd D:\soft-deco-pc
git init
git add .
git commit -m "保存当前状态"
```

### 2. 创建备份分支
```bash
# 创建备份分支
git branch backup-before-changes

# 如果需要恢复，可以切换到备份分支
git checkout backup-before-changes
```

### 3. 使用分支开发新功能
```bash
# 创建功能分支
git checkout -b feature/language-switch

# 开发完成后合并
git checkout main
git merge feature/language-switch
```

---

## 如果之前没有使用 Git

如果你之前没有使用 Git，那么被覆盖的文件无法通过 Git 恢复。

### 替代方案：

1. **检查 IDE 的本地历史**
   - VS Code: 右键文件 → "Timeline" 查看本地历史
   - 其他 IDE 可能有类似功能

2. **检查系统备份**
   - Windows 文件历史记录
   - OneDrive 或其他云同步服务的版本历史

3. **检查临时文件**
   - 有些编辑器会创建临时备份文件（.bak, .tmp 等）

4. **重新实现**
   - 如果无法恢复，请描述 Shop.vue 的功能
   - 我可以帮你重新实现

---

## 推荐的 Git 工作流

### 日常开发
```bash
# 1. 开始新功能前，确保在最新代码
git pull

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 开发过程中经常提交
git add .
git commit -m "描述性的提交信息"

# 4. 功能完成后合并到主分支
git checkout main
git merge feature/new-feature

# 5. 删除功能分支
git branch -d feature/new-feature
```

### 提交信息规范
```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

---

## 图形化 Git 工具（可选）

如果不习惯命令行，可以使用图形化工具：

1. **GitHub Desktop** - https://desktop.github.com/
2. **GitKraken** - https://www.gitkraken.com/
3. **SourceTree** - https://www.sourcetreeapp.com/
4. **VS Code 内置 Git** - 已集成在编辑器中

---

## 下一步

1. 安装 Git
2. 初始化仓库
3. 创建首次提交
4. 尝试查看是否有 Shop.vue 的历史记录
5. 如果没有历史记录，请描述 Shop.vue 的功能，我帮你重新实现
