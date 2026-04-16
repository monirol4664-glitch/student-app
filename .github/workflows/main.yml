[app]
title = Math Plotter
package.name = mathplotter
package.domain = org.monirol
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 0.1

# CRITICAL: Pinning versions prevents "Exit Code 1"
requirements = python3,hostpython3,kivy==2.3.0,numpy==1.26.4,sympy,mpmath

orientation = portrait
fullscreen = 0

# Android specific (Matches the Ubuntu 22.04 environment)
android.api = 33
android.minapi = 21
android.ndk = 25b
android.ndk_api = 21
android.archs = arm64-v8a, armeabi-v7a
android.allow_backup = True

# Permissions for math logic and potential exports
android.permissions = INTERNET, WRITE_EXTERNAL_STORAGE

[buildozer]
log_level = 2
warn_on_root = 1
