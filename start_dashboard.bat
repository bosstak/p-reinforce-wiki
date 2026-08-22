@echo off
chcp 65001 > nul
title Live Workspace Topology Dashboard - Connect AI
echo ========================================================
echo    Live Workspace Topology & Connect AI Dashboard
echo ========================================================
echo.
echo [1/2] 로컬 지식 그래프 서버를 시작합니다...
echo [2/2] 브라우저(http://localhost:8500)가 자동으로 열립니다.
echo.
python dashboard\server.py
pause
