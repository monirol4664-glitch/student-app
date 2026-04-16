from kivy.app import App
from kivy.uix.button import Button

class MainApp(App):
    def build(self):
        # Returns a simple button as the root widget
        return Button(text='Hello, Android!')

if __name__ == '__main__':
    MainApp().run()
    
