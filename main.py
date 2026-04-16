from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.widget import Widget
from kivy.graphics import Line, Color, Rectangle
import sympy as sp

class GraphWidget(Widget):
    def plot(self, equation):
        self.canvas.clear()
        w, h = self.width, self.height
        cx, cy = w / 2, h / 2  # Center of the screen
        scale = 40             # Pixels per unit

        with self.canvas:
            # Draw Axes
            Color(0.5, 0.5, 0.5, 1)
            Line(points=[0, cy, w, cy], width=1) # X-axis
            Line(points=[cx, 0, cx, h], width=1) # Y-axis

            # Plot Equation
            Color(0, 1, 1, 1) # Cyan color for the graph
            try:
                x_sym = sp.symbols('x')
                expr = sp.sympify(equation.replace('^', '**'))
                f = sp.lambdify(x_sym, expr, "math")

                points = []
                # Calculate points from left to right of screen
                for px in range(0, int(w), 2):
                    # Convert pixel to math-x
                    math_x = (px - cx) / scale
                    try:
                        math_y = f(math_x)
                        # Convert math-y back to pixel
                        py = cy + (math_y * scale)
                        
                        # Only add point if it's visible on screen
                        if 0 <= py <= h:
                            points.extend([px, py])
                    except:
                        continue
                
                if len(points) > 2:
                    Line(points=points, width=2)
            except Exception as e:
                print(f"Math Error: {e}")

class PlotterApp(App):
    def build(self):
        root = BoxLayout(orientation='vertical')
        self.graph = GraphWidget()
        
        # UI Controls
        controls = BoxLayout(size_hint_y=0.15, padding=10, spacing=10)
        self.input = TextInput(text="x**2", multiline=False, font_size='20sp')
        btn = Button(text="Plot", size_hint_x=0.3, background_color=(0, 0.7, 0, 1))
        btn.bind(on_press=lambda x: self.graph.plot(self.input.text))
        
        controls.add_widget(self.input)
        controls.add_widget(btn)
        
        root.add_widget(self.graph)
        root.add_widget(controls)
        return root

if __name__ == '__main__':
    PlotterApp().run()
    
