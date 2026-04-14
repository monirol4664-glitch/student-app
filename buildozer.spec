[app]
title = Equation Plotter
package.name = equationplotter
package.domain = org.example
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 0.1
requirements = python3,kivy==2.2.1,numpy,matplotlib==3.4.3,kivy_garden.matplotlib
orientation = portrait
osx.python_version = 3
osx.kivy_version = 2.2.1
fullscreen = 0

# Android Specific
android.api = 30
android.minapi = 21
android.ndk = 23b
android.sdk = 30
android.accept_sdk_license = True
android.arch = arm64-v8a
