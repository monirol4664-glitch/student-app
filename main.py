import os
os.environ['KIVY_NO_ARGS'] = '1'
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.widget import Widget
from kivy.graphics import Line, Color, Rectangle
import sympy as sp
import numpy as np

class GraphWidget(Widget):
    def plot(self, equation):
        self.canvas.clear()
        w, h = self.width, self.height
        cx, cy = w / 2, h / 2
        scale = 40 

        with self.canvas:
            Color(0.4, 0.4, 0.4, 1)
            Line(points=[0, cy, w, cy], width=1)
            Line(points=[cx, 0, cx, h], width=1)

            Color(0, 1, 0.8, 1) # Plot color
            try:
                x_sym = sp.symbols('x')
                # Replace ^ with ** for python compatibility
                safe_eq = equation.replace('^', '**')
                expr = sp.sympify(safe_eq)
                f = sp.lambdify(x_sym, expr, "numpy")

                points = []
                for px in range(0, int(w), 2):
                    math_x = (px - cx) / scale
                    try:
                        math_y = float(f(math_x))
                        py = cy + (math_y * scale)
                        if 0 <= py <= h:
                            points.extend([px, py])
                    except:
                        continue
                
                if len(points) > 2:
                    Line(points=points, width=1.5)
            except Exception as e:
                print(f"Math Error: {e}")

class PlotterApp(App):
    def build(self):
        root = BoxLayout(orientation='vertical')
        self.graph = GraphWidget()
        controls = BoxLayout(size_hint_y=0.15, padding=10, spacing=10)
        self.input = TextInput(text="x**2", multiline=False, font_size='20sp')
        btn = Button(text="Plot", size_hint_x=0.3)
        btn.bind(on_press=lambda x: self.graph.plot(self.input.text))
        controls.add_widget(self.input)
        controls.add_widget(btn)
        root.add_widget(self.graph)
        root.add_widget(controls)
        return root

if __name__ == '__main__':
    PlotterApp().run()
        
