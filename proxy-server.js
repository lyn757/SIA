const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 9000;

// 全局 CORS 中间件 - 必须在所有路由之前
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// 通用代理配置
const proxyOptions = {
  changeOrigin: true,
  ws: true,
  followRedirects: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[代理请求] ${req.method} ${req.url} -> ${proxyReq.path}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    // 确保响应也有 CORS 头
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  },
  onError: (err, req, res) => {
    console.error(`[代理错误] ${req.url}: ${err.message}`);
    res.status(502).json({ error: '代理服务器错误', message: err.message });
  }
};

// 设计师应用代理 - 必须在主应用之前
app.use('/designer', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://localhost:5001',
  pathRewrite: {
    '^/designer': ''
  }
}));

// 供应商应用代理
app.use('/supplier', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://localhost:5002',
  pathRewrite: {
    '^/supplier': ''
  }
}));

// 用户应用代理
app.use('/user', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://localhost:5003',
  pathRewrite: {
    '^/user': ''
  }
}));

// 主应用代理 - 必须放在最后，作为默认路由
// 使用构建后的静态文件
app.use('/', createProxyMiddleware({
  ...proxyOptions,
  target: 'http://localhost:5000'  // serve 默认端口
}));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🚀 反向代理服务器已启动！`);
  console.log(`📍 监听地址: 127.0.0.1:${PORT}`);
  console.log(`\n路由配置:`);
  console.log(`  主应用:     http://127.0.0.1:${PORT}/`);
  console.log(`  设计师应用: http://127.0.0.1:${PORT}/designer`);
  console.log(`  供应商应用: http://127.0.0.1:${PORT}/supplier`);
  console.log(`  用户应用:   http://127.0.0.1:${PORT}/user`);
  console.log(`\n现在可以通过 Cloudflare Tunnel 暴露端口 ${PORT}\n`);
});
