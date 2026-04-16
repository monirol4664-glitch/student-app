import kivy
kivy.require('2.1.0')

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from kivy.graphics import Color, Line, Rectangle
import math
import re

class GraphCanvas(Widget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.expression = ""
        self.x_min = -10
        self.x_max = 10
        self.y_min = -10
        self.y_max = 10
        
    def set_expression(self, expr):
        self.expression = expr
        self.draw_graph()
        
    def evaluate(self, x):
        try:
            expr = self.expression.replace('^', '**')
            expr = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', expr)
            safe_dict = {'x': x, 'sin': math.sin, 'cos': math.cos, 'tan': math.tan,
                        'sqrt': math.sqrt, 'log': math.log, 'exp': math.exp,
                        'pi': math.pi, 'e': math.e, 'abs': math.abs, 'asin': math.asin,
                        'acos': math.acos, 'atan': math.atan}
            result = eval(expr, {"__builtins__": {}}, safe_dict)
            return result
        except:
            return None
            
    def draw_graph(self):
        self.canvas.clear()
        
        with self.canvas:
            Color(1, 1, 1, 1)
            self.bg = Rectangle(size=self.size, pos=self.pos)
            
            Color(0.8, 0.8, 0.8, 1)
            w = self.size[0] / (self.x_max - self.x_min)
            h = self.size[1] / (self.y_max - self.y_min)
            center_x = -self.x_min * w
            center_y = -self.y_min * h
            
            if 0 < self.x_max and self.x_min < 0:
                Line(points=[center_x, 0, center_x, self.size[1]], width=1)
            if 0 < self.y_max and self.y_min < 0:
                Line(points=[0, center_y, self.size[0], center_y], width=1)
            
            if self.expression:
                Color(0.2, 0.5, 0.9, 1)
                points = []
                step = (self.x_max - self.x_min) / 200
                for i in range(201):
                    x = self.x_min + i * step
                    y = self.evaluate(x)
                    if y is not None and self.y_min <= y <= self.y_max:
                        screen_x = (x - self.x_min) * w
                        screen_y = (y - self.y_min) * h
                        points.extend([screen_x, screen_y])
                if len(points) >= 4:
                    Line(points=points, width=2)

class GraphPlotterApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical', padding=10, spacing=10)
        
        title = Label(text='Graph Plotter', size_hint_y=None, height=50, font_size=24)
        layout.add_widget(title)
        
        input_label = Label(text='Enter equation (e.g., x^2 or sin(x)):', size_hint_y=None, height=30)
        layout.add_widget(input_label)
        
        self.equation_input = TextInput(hint_text='e.g., x^2 + 2*x - 1', multiline=False, size_hint_y=None, height=40)
        layout.add_widget(self.equation_input)
        
        plot_btn = Button(text='Plot Graph', size_hint_y=None, height=40)
        plot_btn.bind(on_press=self.plot_graph)
        layout.add_widget(plot_btn)
        
        clear_btn = Button(text='Clear', size_hint_y=None, height=40)
        clear_btn.bind(on_press=self.clear_graph)
        layout.add_widget(clear_btn)
        
        self.graph_canvas = GraphCanvas()
        layout.add_widget(self.graph_canvas)
        
        return layout
        
    def plot_graph(self, instance):
        expr = self.equation_input.text.strip()
        if expr:
            self.graph_canvas.set_expression(expr)
            
    def clear_graph(self, instance):
        self.equation_input.text = ''
        self.graph_canvas.expression = ''
        self.graph_canvas.canvas.clear()

if __name__ == '__main__':
    GraphPlotterApp().run()