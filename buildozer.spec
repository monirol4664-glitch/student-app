[app]
title = My Android App
package.name = myapp
package.domain = org.test
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 0.1

# Requirements: include python3 and kivy
# Add other libraries like 'kivymd' if used
requirements = python3,kivy==2.3.0

# Orientation (landscape, portrait or all)
orientation = portrait

# Android specific configurations
# It is recommended to use higher API levels (e.g., 33 or 34)
android.api = 33
android.minapi = 21
android.sdk = 33
android.ndk = 25b
android.archs = arm64-v8a, armeabi-v7a

# (list) Permissions
android.permissions = INTERNET
