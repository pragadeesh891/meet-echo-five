@echo off
title ECHO-FIVE-MEET Deployment

echo ========================================
echo ECHO-FIVE-MEET Deployment Script
echo ========================================

echo.
echo This script will deploy the ECHO-FIVE-MEET application.
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"

echo.
echo Deployment process completed.
echo.
echo Press any key to exit...
pause >nul