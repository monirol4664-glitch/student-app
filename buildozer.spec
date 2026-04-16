[app]
title = GraphPlotter
package.name = plotter
package.domain = org.test
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 0.1

# PINNED REQUIREMENTS FOR STABILITY
requirements = python3,hostpython3,kivy==2.3.0,numpy==1.26.4,sympy,mpmath

# ANDROID SETTINGS
orientation = portrait
android.archs = arm64-v8a, armeabi-v7a
android.api = 33
android.minapi = 21
android.ndk = 25b
android.ndk_api = 21

# PREVENT SYMPY CRASHES
android.whitelist = unittest/*

[buildozer]
log_level = 2
