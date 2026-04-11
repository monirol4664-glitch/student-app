#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Flutter APK Builder Script        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"

# Set environment variables
export PATH="$PATH:/home/vscode/flutter/bin"
export ANDROID_SDK_ROOT="/home/vscode/android-sdk"
export ANDROID_HOME="/home/vscode/android-sdk"
export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"

echo -e "\n${YELLOW}📱 Building APK...${NC}\n"

# Check if in Flutter project
if [ ! -f "pubspec.yaml" ]; then
    echo -e "${RED}❌ Error: Not in a Flutter project directory${NC}"
    echo -e "${YELLOW}Make sure you're in the directory containing pubspec.yaml${NC}"
    exit 1
fi

# Get project name from pubspec.yaml
PROJECT_NAME=$(grep '^name:' pubspec.yaml | sed 's/name: //' | tr -d ' ')
echo -e "${GREEN}📦 Project: $PROJECT_NAME${NC}"

# Clean previous builds
echo -e "${YELLOW}🧹 Cleaning previous builds...${NC}"
flutter clean

# Get dependencies
echo -e "${YELLOW}📥 Getting dependencies...${NC}"
flutter pub get

# Run build_runner if needed
if grep -q "build_runner" pubspec.yaml; then
    echo -e "${YELLOW}🔨 Running build_runner...${NC}"
    dart run build_runner build --delete-conflicting-outputs
fi

# Build APK
echo -e "${YELLOW}🔨 Building release APK...${NC}"
flutter build apk --release --split-per-abi

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Build successful!${NC}\n"
    
    # Show APK files
    echo -e "${BLUE}📱 APK files:${NC}"
    ls -la build/app/outputs/flutter-apk/*.apk
    
    # Show file sizes
    echo -e "\n${BLUE}📊 File sizes:${NC}"
    for apk in build/app/outputs/flutter-apk/*.apk; do
        SIZE=$(du -h "$apk" | cut -f1)
        NAME=$(basename "$apk")
        echo -e "  ${GREEN}$NAME${NC}: $SIZE"
    done
    
    echo -e "\n${YELLOW}💡 To download APKs:${NC}"
    echo -e "  1. Open File Explorer in Codespace"
    echo -e "  2. Navigate to: build/app/outputs/flutter-apk/"
    echo -e "  3. Right-click on .apk files → Download"
else
    echo -e "\n${RED}❌ Build failed!${NC}"
    echo -e "${YELLOW}Check the error messages above${NC}"
    exit 1
fi