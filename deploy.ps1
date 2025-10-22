# Deployment script for ECHO-FIVE-MEET
# This script builds and deploys the project to the libs directory

Write-Host "Starting deployment process..." -ForegroundColor Green

# Create libs directory if it doesn't exist
if (!(Test-Path libs)) {
    New-Item -ItemType Directory -Path libs | Out-Null
    Write-Host "Created libs directory" -ForegroundColor Yellow
}

# Try to build the main application bundles
Write-Host "Attempting to build application bundles..." -ForegroundColor Yellow
try {
    # Try to run the build script which uses make
    npm run build 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Build completed successfully!" -ForegroundColor Green
        # Copy built files to libs directory
        if (Test-Path "build\app.bundle.min.js") {
            Copy-Item "build\app.bundle.min.js" "libs\" -Force
        }
        if (Test-Path "build\app.bundle.min.js.map") {
            Copy-Item "build\app.bundle.min.js.map" "libs\" -Force
        }
        if (Test-Path "build\external_api.min.js") {
            Copy-Item "build\external_api.min.js" "libs\" -Force
        }
        if (Test-Path "build\external_api.min.js.map") {
            Copy-Item "build\external_api.min.js.map" "libs\" -Force
        }
    } else {
        Write-Host "Build failed, continuing with manual deployment..." -ForegroundColor Yellow
    }
} catch {
    Write-Host "Build failed, continuing with manual deployment..." -ForegroundColor Yellow
}

# Copy lib-jitsi-meet files
Write-Host "Copying lib-jitsi-meet files..." -ForegroundColor Yellow
Copy-Item "node_modules\lib-jitsi-meet\dist\umd\*" "libs\" -Force

# Copy rnnoise.wasm
Write-Host "Copying rnnoise.wasm..." -ForegroundColor Yellow
Copy-Item "node_modules\@jitsi\rnnoise-wasm\dist\rnnoise.wasm" "libs\" -Force

# Copy OLM files
Write-Host "Copying OLM files..." -ForegroundColor Yellow
Copy-Item "node_modules\@matrix-org\olm\olm.wasm" "libs\" -Force

# Copy TensorFlow WASM files
Write-Host "Copying TensorFlow WASM files..." -ForegroundColor Yellow
Copy-Item "node_modules\@tensorflow\tfjs-backend-wasm\dist\*.wasm" "libs\" -Force

# Copy TFLite WASM files
Write-Host "Copying TFLite WASM files..." -ForegroundColor Yellow
Copy-Item "react\features\stream-effects\virtual-background\vendor\tflite\*.wasm" "libs\" -Force

# Copy Excalidraw assets
Write-Host "Copying Excalidraw assets..." -ForegroundColor Yellow
if (Test-Path "libs\excalidraw-assets") {
    Remove-Item "libs\excalidraw-assets" -Recurse -Force
}
Copy-Item "node_modules\@jitsi\excalidraw\dist\excalidraw-assets" "libs\" -Recurse -Force

# Copy face landmarks models
Write-Host "Copying face landmarks models..." -ForegroundColor Yellow
Copy-Item "node_modules\@vladmandic\human-models\models\blazeface-front.bin" "libs\" -Force
Copy-Item "node_modules\@vladmandic\human-models\models\blazeface-front.json" "libs\" -Force
Copy-Item "node_modules\@vladmandic\human-models\models\emotion.bin" "libs\" -Force
Copy-Item "node_modules\@vladmandic\human-models\models\emotion.json" "libs\" -Force

# Build CSS
Write-Host "Building CSS..." -ForegroundColor Yellow
npx sass css/main.scss css/all.bundle.css
npx cleancss --skip-rebase css/all.bundle.css > css/all.css
Copy-Item "css/all.css" "libs\" -Force

# Copy static files
Write-Host "Copying static files..." -ForegroundColor Yellow
Copy-Item "static\*" "libs\" -Recurse -Force

# Copy images
Write-Host "Copying images..." -ForegroundColor Yellow
Copy-Item "images\*" "libs\images\" -Recurse -Force

# Copy sounds
Write-Host "Copying sounds..." -ForegroundColor Yellow
Copy-Item "sounds\*" "libs\sounds\" -Recurse -Force

# Copy fonts
Write-Host "Copying fonts..." -ForegroundColor Yellow
Copy-Item "fonts\*" "libs\fonts\" -Recurse -Force

# Copy main HTML files
Write-Host "Copying HTML files..." -ForegroundColor Yellow
Copy-Item "*.html" "libs\" -Force

# Copy manifest.json
Write-Host "Copying manifest.json..." -ForegroundColor Yellow
Copy-Item "manifest.json" "libs\" -Force

Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "The deployed files are in the 'libs' directory." -ForegroundColor Cyan