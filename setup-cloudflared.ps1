# 下载 Cloudflare Tunnel (cloudflared)
$url = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
$output = "$PSScriptRoot\cloudflared.exe"

Write-Host "正在下载 cloudflared..." -ForegroundColor Green
Invoke-WebRequest -Uri $url -OutFile $output

Write-Host "下载完成！" -ForegroundColor Green
Write-Host "现在可以运行: .\cloudflared.exe tunnel --url http://localhost:8080" -ForegroundColor Yellow
