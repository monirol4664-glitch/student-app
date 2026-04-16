import os
# Force Kivy to ignore command line arguments that Android might pass
os.environ['KIVY_NO_ARGS'] = '1'

import kivy
kivy.require('2.3.0')

from kivy.app import App
# The rest of your imports...
