# install.ps1 - Dependency Validator and Setup Bootstrapper
Write-Host "==============================================" -ForegroundColor Gold
Write-Host "🎬 Video Content Production Plugin Installer" -ForegroundColor Gold
Write-Host "==============================================" -ForegroundColor Gold

$errors = 0

# Check Node.js
Write-Host "Checking Node.js..." -NoNewline
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVer = node -v
    Write-Host " [OK] ($nodeVer)" -ForegroundColor Green
} else {
    Write-Host " [FAILED] Please install Node.js 18+ (https://nodejs.org/)" -ForegroundColor Red
    $errors++
}

# Check Python
Write-Host "Checking Python..." -NoNewline
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pyVer = python --version
    Write-Host " [OK] ($pyVer)" -ForegroundColor Green
} else {
    Write-Host " [FAILED] Please install Python 3.10+ (https://python.org/)" -ForegroundColor Red
    $errors++
}

# Check ffmpeg
Write-Host "Checking ffmpeg..." -NoNewline
if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
    $ffVer = ffmpeg -version
    $ffVerShort = $ffVer[0]
    Write-Host " [OK] ($ffVerShort)" -ForegroundColor Green
} else {
    Write-Host " [FAILED] ffmpeg not found. Please install ffmpeg and add it to your PATH." -ForegroundColor Red
    $errors++
}

if ($errors -eq 0) {
    Write-Host "`nAll major system prerequisites met!" -ForegroundColor Green
    Write-Host "To install Hyperframes, run: npm install -g hyperframes" -ForegroundColor Cyan
    Write-Host "To install whisper/manim dependencies, refer to the Lane guides inside SKILL.md.`n" -ForegroundColor Cyan
} else {
    Write-Host "`nWarning: $errors missing system prerequisites detected. The plugin might run with restricted lanes." -ForegroundColor Yellow
}
