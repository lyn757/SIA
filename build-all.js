const { execSync } = require('child_process');
const path = require('path');

console.log('🔨 开始构建所有应用...\n');

const apps = [
  { name: 'main-web', desc: '主应用' },
  { name: 'designer-web', desc: '设计师应用' },
  { name: 'supplier-web', desc: '供应商应用' },
  { name: 'user-web', desc: '用户应用' }
];

apps.forEach((app, index) => {
  console.log(`\n[${index + 1}/${apps.length}] 构建 ${app.desc} (${app.name})...`);
  console.log('─'.repeat(50));
  
  try {
    const appPath = path.join('packages', app.name);
    
    // 安装依赖（如果需要）
    console.log('📦 检查依赖...');
    execSync('npm install', { 
      cwd: appPath, 
      stdio: 'inherit' 
    });
    
    // 构建
    console.log('🔨 构建中...');
    execSync('npm run build', { 
      cwd: appPath, 
      stdio: 'inherit' 
    });
    
    console.log(`✅ ${app.desc} 构建成功！`);
    
  } catch (error) {
    console.error(`\n❌ ${app.desc} 构建失败：`, error.message);
    process.exit(1);
  }
});

console.log('\n' + '='.repeat(50));
console.log('🎉 所有应用构建完成！');
console.log('='.repeat(50));
console.log('\n💡 下一步：运行部署脚本');
console.log('   node deploy-gh-pages.js\n');
