#!/bin/bash
set -e

echo "🔧 Setting up Flutter APK build environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update package list
print_status "Updating package list..."
sudo apt-get update -qq

# Install dependencies
print_status "Installing dependencies..."
sudo apt-get install -y -qq \
    curl \
    wget \
    unzip \
    zip \
    git \
    make \
    cmake \
    ninja-build \
    pkg-config \
    libgtk-3-dev \
    liblzma-dev \
    libstdc++-12-dev \
    xz-utils \
    openjdk-17-jdk

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc

# Install Flutter SDK
print_status "Installing Flutter SDK..."
cd /home/vscode
if [ ! -d "flutter" ]; then
    wget -q https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.27.4-stable.tar.xz
    tar xf flutter_linux_3.27.4-stable.tar.xz
    rm flutter_linux_3.27.4-stable.tar.xz
fi

# Add Flutter to PATH
export PATH="$PATH:/home/vscode/flutter/bin"
echo 'export PATH="$PATH:/home/vscode/flutter/bin"' >> ~/.bashrc

# Install Android SDK command line tools
print_status "Installing Android SDK..."
cd /home/vscode
if [ ! -d "android-sdk" ]; then
    mkdir -p android-sdk/cmdline-tools
    cd android-sdk/cmdline-tools
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
    unzip -q commandlinetools-linux-11076708_latest.zip
    mv cmdline-tools latest
    rm commandlinetools-linux-11076708_latest.zip
    cd /home/vscode
fi

# Set Android SDK environment variables
export ANDROID_SDK_ROOT="/home/vscode/android-sdk"
export ANDROID_HOME="/home/vscode/android-sdk"
echo 'export ANDROID_SDK_ROOT="/home/vscode/android-sdk"' >> ~/.bashrc
echo 'export ANDROID_HOME="/home/vscode/android-sdk"' >> ~/.bashrc
echo 'export PATH="$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools"' >> ~/.bashrc

# Accept Android SDK licenses
print_status "Accepting Android SDK licenses..."
export ANDROID_SDK_ROOT="/home/vscode/android-sdk"
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
yes | /home/vscode/android-sdk/cmdline-tools/latest/bin/sdkmanager --licenses > /dev/null 2>&1 || true

# Install required Android packages
print_status "Installing Android build tools..."
/home/vscode/android-sdk/cmdline-tools/latest/bin/sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "platforms;android-33" \
    "build-tools;34.0.0" \
    "build-tools;33.0.2" \
    "emulator" > /dev/null 2>&1

# Configure Flutter
print_status "Configuring Flutter..."
flutter config --android-sdk /home/vscode/android-sdk --no-analytics
flutter precache

# Enable Android build support
flutter config --enable-android

# Verify Flutter installation
print_status "Verifying Flutter installation..."
flutter doctor -v

print_status "✅ Setup complete!"
print_status "To build an APK:"
print_status "  1. cd /workspaces/your-project-name"
print_status "  2. flutter pub get"
print_status "  3. flutter build apk --release"