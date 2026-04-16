[app]

# App title
title = Graph Plotter

# Package name (no spaces, lowercase)
package.name = graphplotter

# Package domain
package.domain = org.example

# Source directory (where main.py lives)
source.dir = .

# Main entry point
source.include_exts = py,png,jpg,kv,atlas

# App version
version = 1.0

# Requirements â€” numpy is included for curve calculations
requirements = python3,kivy==2.3.0,numpy

# Orientation
orientation = portrait

# Android permissions
android.permissions = INTERNET

# Android API targets
android.api = 33
android.minapi = 21
android.ndk = 25b

# Architecture (armeabi-v7a covers most devices; add arm64-v8a for 64-bit)
android.archs = arm64-v8a, armeabi-v7a

# Fullscreen
fullscreen = 0

# Android theme â€” no title bar inside app
android.theme = "@android:style/Theme.NoTitleBar"

# Logcat filters for debugging
android.logcat_filters = *:S python:D

[buildozer]

# Log level (0 = error only, 2 = verbose)
log_level = 2

# Warn before cleaning build folder
warn_on_root = 1
