const { spawn } = require('child_process');

// 端口配置
const ports = {
  main: 8080,
  designer: 8081,
  supplier: 8082,
  user: 8084
};

console.log('🚀 启动公网隧道...\n');

// 使用 localtunnel 为每个端口创建隧道
Object.entries(ports).forEach(([name, port]) => {
  const tunnel = spawn('npx', ['localtunnel', '--port', port.toString()], {
    stdio: 'pipe',
    shell: true
  });

  tunnel.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('your url is:')) {
      console.log(`✅ ${name.padEnd(10)} (${port}): ${output.split('your url is:')[1].trim()}`);
    }
  });

  tunnel.stderr.on('data', (data) => {
    console.error(`❌ ${name} 错误: ${data}`);
  });
});

console.log('\n💡 提示: 请确保开发服务器已经在运行 (npm run dev)\n');
console.log('按 Ctrl+C 停止所有隧道\n');
