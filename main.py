import kivy
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from kivy.graphics import Color, Line
import math

class GraphWidget(Widget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.func = lambda x: x**2
        self.bind(pos=self.draw_graph, size=self.draw_graph)
    
    def set_function(self, func_str):
        try:
            # Safe math evaluator
            safe_dict = {
                'x': 0, 'sin': math.sin, 'cos': math.cos, 'tan': math.tan,
                'exp': math.exp, 'log': math.log, 'sqrt': math.sqrt,
                'pi': math.pi, 'e': math.e, 'abs': abs
            }
            # Test the function
            test_func = lambda x: eval(func_str, {"__builtins__": {}}, {**safe_dict, 'x': x})
            test_func(1)
            self.func = test_func
            self.draw_graph()
            return True
        except:
            return False
    
    def draw_graph(self, *args):
        self.canvas.clear()
        if self.width == 0 or self.height == 0:
            return
        
        with self.canvas:
            # Grid
            Color(0.9, 0.9, 0.9, 1)
            for i in range(-10, 11):
                if i != 0:
                    x_pos = self.width/2 + (i * self.width/20)
                    Line(points=[x_pos, 0, x_pos, self.height], width=1)
                    y_pos = self.height/2 + (i * self.height/20)
                    Line(points=[0, y_pos, self.width, y_pos], width=1)
            
            # Axes
            Color(0, 0, 0, 1)
            Line(points=[self.width/2, 0, self.width/2, self.height], width=2)
            Line(points=[0, self.height/2, self.width, self.height/2], width=2)
            
            # Graph line
            Color(0, 0, 1, 1)
            points = []
            last_y = None
            for x_pixel in range(int(self.width)):
                x = (x_pixel - self.width/2) * 20 / self.width
                try:
                    y = self.func(x)
                    y_pixel = self.height/2 - (y * self.height/20)
                    if 0 <= y_pixel <= self.height:
                        points.append(x_pixel)
                        points.append(y_pixel)
                    else:
                        if len(points) >= 4:
                            Line(points=points, width=2)
                        points = []
                except:
                    if len(points) >= 4:
                        Line(points=points, width=2)
                    points = []
            
            if len(points) >= 4:
                Line(points=points, width=2)

class GraphApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical', padding=10, spacing=10)
        
        self.graph = GraphWidget()
        self.input = TextInput(
            text='x**2',
            hint_text='Enter: x**2, sin(x), exp(x), etc.',
            size_hint_y=None,
            height=50,
            font_size=20
        )
        self.button = Button(text='DRAW GRAPH', size_hint_y=None, height=50, font_size=20)
        self.button.bind(on_press=self.draw_graph)
        self.error = Label(text='', size_hint_y=None, height=30, color=(1,0,0,1))
        
        layout.add_widget(self.input)
        layout.add_widget(self.button)
        layout.add_widget(self.error)
        layout.add_widget(self.graph)
        
        self.draw_graph(None)
        return layout
    
    def draw_graph(self, instance):
        if self.graph.set_function(self.input.text):
            self.error.text = ''
        else:
            self.error.text = 'ERROR: Invalid equation!'

if __name__ == '__main__':
    GraphApp().run()
