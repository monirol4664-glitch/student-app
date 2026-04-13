[app]

title = Graph Plotter
package.name = graphplotter
package.domain = org.graphplotter
version = 1.0

source.dir = .
source.include_exts = py

requirements = python3,kivy==2.2.1

android.permissions = INTERNET
android.api = 30
android.minapi = 21
android.ndk = 23b
android.sdk = 30

orientation = portrait
fullscreen = 0

[buildozer]
log_level = 2
warn_on_root = 1
accept_android_sdk_license = True
accept_android_ndk_license = True
