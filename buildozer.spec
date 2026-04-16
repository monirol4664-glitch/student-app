[app]
title = MathPlotter
package.name = mathplotter
package.domain = org.myapp
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 0.1

# PINNED REQUIREMENTS - DO NOT CHANGE
requirements = python3,hostpython3,kivy==2.3.0,numpy==1.26.4,sympy,mpmath

orientation = portrait
fullscreen = 0
android.archs = arm64-v8a, armeabi-v7a
android.api = 33
android.minapi = 21
android.ndk = 25b
android.ndk_api = 21
android.allow_backup = True
android.permissions = INTERNET

[buildozer]
log_level = 2
warn_on_root = 1
