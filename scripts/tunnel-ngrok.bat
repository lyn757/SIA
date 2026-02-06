@echo off
echo 启动 ngrok 公网隧道...
echo.
echo 请在不同的终端窗口中运行以下命令:
echo.
echo 主应用 (8080):
echo ngrok http 8080
echo.
echo 设计师应用 (8081):
echo ngrok http 8081
echo.
echo 供应商应用 (8082):
echo ngrok http 8082
echo.
echo 用户应用 (8084):
echo ngrok http 8084
echo.
echo 或者使用 localtunnel (更简单):
echo npx localtunnel --port 8080
echo.
pause
