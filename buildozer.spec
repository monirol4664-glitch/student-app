[app]
title = Math Plotter
package.name = mathplotter
package.domain = org.yourname
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 0.1

# Requirements are vital!
requirements = python3,kivy,sympy,mpmath,numpy

orientation = portrait
osx.python_version = 3
osx.kivy_version = 1.9.1
fullscreen = 0
android.archs = arm64-v8a, armeabi-v7a
android.allow_backup = True
