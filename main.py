import kivy
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy_garden.matplotlib.backend_kivyagg import FigureCanvasKivyAgg
import matplotlib.pyplot as plt
import numpy as np

class EquationPlotter(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(orientation='vertical', **kwargs)
        self.text_input = TextInput(text='sin(x)', multiline=False)
        self.plot_button = Button(text='Generate Plot')
        self.plot_button.bind(on_press=self.update_plot)
        
        self.add_widget(self.text_input)
        self.add_widget(self.plot_button)
        
        # Initial plot
        self.figure, self.ax = plt.subplots()
        self.canvas = FigureCanvasKivyAgg(self.figure)
        self.add_widget(self.canvas)
        self.update_plot(None)

    def update_plot(self, instance):
        self.ax.clear()
        x = np.linspace(-10, 10, 200)
        try:
            y = eval(self.text_input.text)
            self.ax.plot(x, y)
            self.ax.grid(True)
            self.canvas.draw()
        except Exception as e:
            print(f"Error: {e}")

class PlotterApp(App):
    def build(self):
        return EquationPlotter()

if __name__ == '__main__':
    PlotterApp().run()
