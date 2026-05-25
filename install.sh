#!/bin/bash

# install.sh - Dependency Validator and Setup Bootstrapper
echo -e "\033[1;33m==============================================\033[0m"
echo -e "\033[1;33m🎬 Video Content Production Plugin Installer\033[0m"
echo -e "\033[1;33m==============================================\033[0m"

errors=0

# Check Node.js
echo -n "Checking Node.js..."
if command -v node &> /dev/null; then
    nodeVer=$(node -v)
    echo -e " \033[0;32m[OK]\033[0m ($nodeVer)"
else
    echo -e " \033[0;31m[FAILED]\033[0m Please install Node.js 18+ (https://nodejs.org/)"
    ((errors++))
fi

# Check Python
echo -n "Checking Python..."
if command -v python3 &> /dev/null; then
    pyVer=$(python3 --version)
    echo -e " \033[0;32m[OK]\033[0m ($pyVer)"
elif command -v python &> /dev/null; then
    pyVer=$(python --version)
    echo -e " \033[0;32m[OK]\033[0m ($pyVer)"
else
    echo -e " \033[0;31m[FAILED]\033[0m Please install Python 3.10+ (https://python.org/)"
    ((errors++))
fi

# Check ffmpeg
echo -n "Checking ffmpeg..."
if command -v ffmpeg &> /dev/null; then
    ffVer=$(ffmpeg -version | head -n 1)
    echo -e " \033[0;32m[OK]\033[0m ($ffVer)"
else
    echo -e " \033[0;31m[FAILED]\033[0m ffmpeg not found. Please install ffmpeg and add it to your PATH."
    ((errors++))
fi

if [ $errors -eq 0 ]; then
    echo -e "\n\033[0;32mAll major system prerequisites met!\033[0m"
    echo -e "\033[0;36mTo install Hyperframes, run: npm install -g hyperframes\033[0m"
    echo -e "\033[0;36mTo install whisper/manim dependencies, refer to the Lane guides inside SKILL.md.\033[0m\n"
else
    echo -e "\n\033[0;33mWarning: $errors missing system prerequisites detected. The plugin might run with restricted lanes.\033[0m"
fi
