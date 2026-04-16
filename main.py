import os

# 1. Environment Fix: Prevents Kivy from crashing on certain Android versions
os.environ['KIVY_NO_ARGS'] = '1'

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from kivy.graphics import Line, Color, InstructionGroup
from kivy.core.window import Window
import sympy as sp
import numpy as np

# Set a dark background color for the window
Window.clearcolor = (0.1, 0.1, 0.1, 1)

class GraphWidget(Widget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.points_instruction = InstructionGroup()

    def plot(self, equation_str):
        # Clear previous drawings
        self.canvas.clear()
        w, h = self.width, self.height
        cx, cy = w / 2, h / 2  # Center of the widget
        
        # Scale: how many pixels represent 1 math unit
        scale = w / 20  # Shows roughly from -10 to 10 on X axis

        with self.canvas:
            # --- Draw Grid/Axes ---
            Color(0.3, 0.3, 0.3, 1) # Gray for axes
            Line(points=[0, cy, w, cy], width=1) # X-axis
            Line(points=[cx, 0, cx, h], width=1) # Y-axis

            # --- Calculate Math ---
            try:
                # Sanitize input: replace ^ with ** for Python
                equation_str = equation_str.replace('^', '**')
                x_sym = sp.symbols('x')
                expr = sp.sympify(equation_str)
                
                # Use numpy for fast calculations across the screen width
                f = sp.lambdify(x_sym, expr, "numpy")

                # Generate x values based on screen pixels
                # From -10 to 10 math units
                x_math = np.linspace(-10, 10, 500)
                y_math = f(x_math)

                # Convert math coordinates to screen pixels
                plot_points = []
                for i in range(len(x_math)):
                    px = cx + (x_math[i] * scale)
                    # We subtract from cy because screen Y is 0 at the bottom
                    py = cy + (y_math[i] * scale)

                    # Only add point if it's within the vertical bounds of the widget
                    if 0 <= py <= h:
                        plot_points.extend([float(px), float(py)])

                # --- Draw the Function ---
                Color(0, 0.8, 1, 1) # Bright Cyan
                if len(plot_points) >= 4:
                    Line(points=plot_points, width=2)
                
            except Exception as e:
                print(f"Plot Error: {e}")

class MainLayout(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(orientation='vertical', padding=20, spacing=10, **kwargs)

        # Title
        self.add_widget(Label(text="Equation Plotter", font_size='24sp', size_hint_y=0.1))

        # Graph Area
        self.graph = GraphWidget(size_hint_y=0.7)
        self.add_widget(self.graph)

        # Input Area
        self.input_box = TextInput(
            text="x**2",
            multiline=False,
            font_size='20sp',
            size_hint_y=0.1,
            background_color=(0.2, 0.2, 0.2, 1),
            foreground_color=(1, 1, 1, 1),
            hint_text="Enter equation (e.g., sin(x) or x**2)"
        )
        self.add_widget(self.input_box)

        # Button
        self.plot_btn = Button(
            text="Update Graph",
            size_hint_y=0.1,
            background_color=(0, 0.5, 0.8, 1),
            font_size='18sp'
        )
        self.plot_btn.bind(on_press=self.on_plot_click)
        self.add_widget(self.plot_btn)

    def on_plot_click(self, instance):
        self.graph.plot(self.input_box.text)

class PlotterApp(App):
    def build(self):
        return MainLayout()

if __name__ == '__main__':
    PlotterApp().run()
                      
