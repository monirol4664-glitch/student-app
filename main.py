import os
os.environ['KIVY_NO_ARGS'] = '1'

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from kivy.graphics import Line, Color
from kivy.core.window import Window
import sympy as sp
import numpy as np

Window.clearcolor = (0.05, 0.05, 0.05, 1)

class GraphWidget(Widget):
    def plot(self, equation_str):
        self.canvas.clear()
        w, h = self.width, self.height
        cx, cy = w / 2, h / 2
        scale = w / 20 

        with self.canvas:
            Color(0.2, 0.2, 0.2, 1)
            Line(points=[0, cy, w, cy], width=1)
            Line(points=[cx, 0, cx, h], width=1)

            try:
                # Sanitize input: x^2 -> x**2
                eq = equation_str.replace('^', '**')
                x_sym = sp.symbols('x')
                expr = sp.sympify(eq)
                f = sp.lambdify(x_sym, expr, "numpy")

                x_math = np.linspace(-10, 10, 400)
                y_math = f(x_math)

                plot_points = []
                for i in range(len(x_math)):
                    px = cx + (x_math[i] * scale)
                    py = cy + (y_math[i] * scale)
                    if 0 <= py <= h:
                        plot_points.extend([float(px), float(py)])

                Color(0, 1, 0.5, 1) 
                if len(plot_points) >= 4:
                    Line(points=plot_points, width=2)
            except:
                pass

class MainApp(App):
    def build(self):
        root = BoxLayout(orientation='vertical', padding=15, spacing=10)
        self.graph = GraphWidget(size_hint_y=0.8)
        self.input = TextInput(text="x**2", multiline=False, size_hint_y=0.1, font_size='22sp')
        btn = Button(text="PLOT", size_hint_y=0.1, background_color=(0, 0.6, 1, 1))
        btn.bind(on_press=lambda x: self.graph.plot(self.input.text))
        
        root.add_widget(self.graph)
        root.add_widget(self.input)
        root.add_widget(btn)
        return root

if __name__ == '__main__':
    MainApp().run()
    
