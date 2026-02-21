@echo off
TITLE Financial Forensics Engine
echo ==============================================
echo   FINANCIAL FORENSICS ENGINE - SMART STARTUP
echo ==============================================
echo.
echo [1/3] Verifying and updating dependencies...
call npm run install-all

echo.
echo [2/3] Launching Live Dashboard...
start "" http://localhost:5173

echo.
echo [3/3] Starting Backend and Frontend services...
echo.
echo Press Ctrl+C to stop both servers.
echo.
npm run dev
