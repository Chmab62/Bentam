@echo off
setlocal enabledelayedexpansion

title BENTAM BUTCHERY - Simple Server

echo.
echo ========================================
echo   BENTAM BUTCHERY - Mobile Test Server
echo ========================================
echo.

REM Get IP address
for /f "tokens=2 delims=: " %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set "IP_ADDRESS=%%a"
)

echo Your Computer IP: %IP_ADDRESS%
echo.
echo ON YOUR MOBILE PHONE, OPEN BROWSER AND VISIT:
echo.
echo http://%IP_ADDRESS%:8000/
echo.
echo ========================================
echo Starting server with PowerShell...
echo Press Ctrl+C to stop
echo.

powershell -NoProfile -Command "
$ip = '%IP_ADDRESS%'
$port = 8000
$folder = 'c:\Bentam Butchery'

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add(\"http://*:$port/\")
$listener.Start()

Write-Host '✓ Server started on port $port'
Write-Host \"✓ Open on mobile: http://$ip:$port/\"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $file = $request.Url.LocalPath
        if ($file -eq '/' -or $file -eq '') {
            $file = '/index (2).html'
        }
        
        $filepath = Join-Path $folder ($file.Substring(1))
        
        if (Test-Path $filepath) {
            $content = [System.IO.File]::ReadAllBytes($filepath)
            $response.OutputStream.Write($content, 0, $content.Length)
            $response.StatusCode = 200
            Write-Host \"✓ Served: $file\"
        } else {
            $response.StatusCode = 404
            $response.OutputStream.Write([System.Text.Encoding]::UTF8.GetBytes('404 Not Found'), 0, 13)
            Write-Host \"✗ Not found: $file\"
        }
        
        $response.Close()
    } catch {
        Write-Host \"Error: $_\"
    }
}
"

pause
