"""
Graph Plotter - Kivy App
Plot mathematical equations on Android/Desktop
"""

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.scrollview import ScrollView
from kivy.uix.widget import Widget
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.spinner import Spinner
from kivy.graphics import (
    Color, Line, Rectangle, Ellipse, InstructionGroup
)
from kivy.core.window import Window
from kivy.metrics import dp
from kivy.clock import Clock
from kivy.utils import get_color_from_hex

import math
import numpy as np

# ── Colour Palette ──────────────────────────────────────────────
BG_DARK    = get_color_from_hex("#0d0f14")
BG_PANEL   = get_color_from_hex("#13161e")
BG_INPUT   = get_color_from_hex("#1c2030")
ACCENT     = get_color_from_hex("#00e5ff")
ACCENT2    = get_color_from_hex("#ff4081")
GRID_COLOR = get_color_from_hex("#1e2535")
AXIS_COLOR = get_color_from_hex("#2e3d55")
TEXT_COLOR = get_color_from_hex("#cdd6f4")
DIM_COLOR  = get_color_from_hex("#585b70")

PLOT_COLORS = [
    "#00e5ff", "#ff4081", "#69ff47", "#ffb300",
    "#c77dff", "#ff6d00", "#00e5b0", "#ff2d6f",
]


# ── Safe math evaluator ─────────────────────────────────────────
SAFE_NAMES = {
    k: v for k, v in vars(math).items() if not k.startswith("_")
}
SAFE_NAMES.update({
    "abs": abs, "round": round,
    "pi": math.pi, "e": math.e, "tau": math.tau,
})


def safe_eval(expr: str, x_val: float):
    """Evaluate expression with x substituted."""
    try:
        return float(eval(expr, {"__builtins__": {}}, {**SAFE_NAMES, "x": x_val}))
    except Exception:
        return float("nan")


# ── Graph Canvas ────────────────────────────────────────────────
class GraphCanvas(Widget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.equations  = []   # list of (expr_str, color_hex)
        self.x_min      = -10.0
        self.x_max      =  10.0
        self.y_min      = -10.0
        self.y_max      =  10.0
        self.num_points = 500

        self._drag_start    = None
        self._pan_x_min     = None
        self._pinch_dist    = None

        self.bind(pos=self._redraw, size=self._redraw)

    # ── public ──────────────────────────────────────────────────
    def set_equations(self, equations):
        self.equations = equations
        self._redraw()

    def reset_view(self):
        self.x_min, self.x_max = -10.0, 10.0
        self.y_min, self.y_max = -10.0, 10.0
        self._redraw()

    def zoom(self, factor, cx=None, cy=None):
        if cx is None:
            cx = (self.x_min + self.x_max) / 2
        if cy is None:
            cy = (self.y_min + self.y_max) / 2
        w = (self.x_max - self.x_min) * factor / 2
        h = (self.y_max - self.y_min) * factor / 2
        self.x_min, self.x_max = cx - w, cx + w
        self.y_min, self.y_max = cy - h, cy + h
        self._redraw()

    # ── touch ────────────────────────────────────────────────────
    def on_touch_down(self, touch):
        if not self.collide_point(*touch.pos):
            return False
        if touch.is_double_tap:
            self.reset_view()
            return True
        touch.grab(self)
        self._drag_start  = touch.pos
        self._pan_x_min   = self.x_min
        self._pan_y_min   = self.y_min
        return True

    def on_touch_move(self, touch):
        if touch.grab_current is not self:
            return False
        # pinch-zoom (two fingers)
        if len(touch.ud.get("touches", [])) >= 2:
            return False
        dx_px = touch.pos[0] - self._drag_start[0]
        dy_px = touch.pos[1] - self._drag_start[1]
        dx    = -dx_px / self.width  * (self.x_max - self.x_min)
        dy    = -dy_px / self.height * (self.y_max - self.y_min)
        span  = self.x_max - self.x_min
        span_y = self.y_max - self.y_min
        self.x_min = self._pan_x_min + dx
        self.x_max = self.x_min + span
        self.y_min = self._pan_y_min + dy  # note: stored as bottom
        self.y_max = self.y_min + span_y
        self._redraw()
        return True

    def on_touch_up(self, touch):
        if touch.grab_current is self:
            touch.ungrab(self)
        return False

    # ── coordinate helpers ───────────────────────────────────────
    def _to_px(self, gx, gy):
        px = self.x + (gx - self.x_min) / (self.x_max - self.x_min) * self.width
        py = self.y + (gy - self.y_min) / (self.y_max - self.y_min) * self.height
        return px, py

    # ── draw ─────────────────────────────────────────────────────
    def _redraw(self, *args):
        self.canvas.clear()
        with self.canvas:
            # background
            Color(*BG_DARK)
            Rectangle(pos=self.pos, size=self.size)

            self._draw_grid()
            self._draw_axes()
            self._draw_curves()
            self._draw_border()

    def _draw_grid(self):
        x_step = self._nice_step(self.x_max - self.x_min)
        y_step = self._nice_step(self.y_max - self.y_min)

        Color(*GRID_COLOR)
        # vertical grid
        x = math.ceil(self.x_min / x_step) * x_step
        while x <= self.x_max:
            px, _ = self._to_px(x, 0)
            Line(points=[px, self.y, px, self.y + self.height], width=dp(0.5))
            x = round(x + x_step, 10)

        # horizontal grid
        y = math.ceil(self.y_min / y_step) * y_step
        while y <= self.y_max:
            _, py = self._to_px(0, y)
            Line(points=[self.x, py, self.x + self.width, py], width=dp(0.5))
            y = round(y + y_step, 10)

        # tick labels
        Color(*DIM_COLOR)
        x = math.ceil(self.x_min / x_step) * x_step
        while x <= self.x_max:
            if abs(x) > x_step * 0.1:
                px, py_ax = self._to_px(x, 0)
                py_ax = max(self.y + dp(2), min(self.y + self.height - dp(14), py_ax))

        y = math.ceil(self.y_min / y_step) * y_step
        while y <= self.y_max:
            y = round(y + y_step, 10)

    def _draw_axes(self):
        Color(*AXIS_COLOR)
        # x-axis
        if self.y_min <= 0 <= self.y_max:
            _, py = self._to_px(0, 0)
            Line(points=[self.x, py, self.x + self.width, py], width=dp(1.2))
        # y-axis
        if self.x_min <= 0 <= self.x_max:
            px, _ = self._to_px(0, 0)
            Line(points=[px, self.y, px, self.y + self.height], width=dp(1.2))

        # origin dot
        if self.x_min <= 0 <= self.x_max and self.y_min <= 0 <= self.y_max:
            Color(*ACCENT)
            px, py = self._to_px(0, 0)
            Ellipse(pos=(px - dp(3), py - dp(3)), size=(dp(6), dp(6)))

    def _draw_curves(self):
        xs = np.linspace(self.x_min, self.x_max, self.num_points)
        for i, (expr, col_hex) in enumerate(self.equations):
            if not expr.strip():
                continue
            ys = np.array([safe_eval(expr, xv) for xv in xs])
            r, g, b, a = get_color_from_hex(col_hex)
            Color(r, g, b, 1)

            pts = []
            for xv, yv in zip(xs, ys):
                if math.isnan(yv) or math.isinf(yv) or not (self.y_min <= yv <= self.y_max):
                    if pts:
                        if len(pts) >= 4:
                            Line(points=pts, width=dp(2))
                        pts = []
                else:
                    px, py = self._to_px(xv, yv)
                    pts.extend([px, py])
            if len(pts) >= 4:
                Line(points=pts, width=dp(2))

    def _draw_border(self):
        Color(*ACCENT[:3], 0.3)
        Line(rectangle=(self.x, self.y, self.width, self.height), width=dp(1))

    @staticmethod
    def _nice_step(span):
        raw = span / 8
        mag = 10 ** math.floor(math.log10(raw))
        for s in (1, 2, 5, 10):
            if s * mag >= raw:
                return s * mag
        return mag * 10


# ── Main Layout ─────────────────────────────────────────────────
class GraphPlotterLayout(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(orientation="vertical", spacing=dp(4), padding=dp(6), **kwargs)
        self.canvas_bg_color = BG_DARK
        self.equation_rows   = []   # list of TextInput widgets
        self._build_ui()

    def _build_ui(self):
        with self.canvas.before:
            Color(*BG_DARK)
            self._bg_rect = Rectangle(pos=self.pos, size=self.size)
        self.bind(pos=self._update_bg, size=self._update_bg)

        # ── Title bar ───────────────────────────────────────────
        title = Label(
            text="[b][color=00e5ff]f(x)[/color] Graph Plotter[/b]",
            markup=True,
            font_size=dp(20),
            size_hint_y=None,
            height=dp(40),
            color=TEXT_COLOR,
        )
        self.add_widget(title)

        # ── Graph canvas ────────────────────────────────────────
        self.graph = GraphCanvas(size_hint_y=0.6)
        self.add_widget(self.graph)

        # ── Zoom controls ───────────────────────────────────────
        zoom_bar = BoxLayout(
            size_hint_y=None, height=dp(40), spacing=dp(6)
        )
        for label, factor in (("＋", 0.6), ("－", 1.6), ("⟳", None)):
            btn = Button(
                text=label,
                font_size=dp(18),
                background_color=BG_INPUT,
                color=ACCENT,
                background_normal="",
            )
            if factor is not None:
                btn.bind(on_release=lambda _, f=factor: self.graph.zoom(f))
            else:
                btn.bind(on_release=lambda _: self.graph.reset_view())
            zoom_bar.add_widget(btn)
        self.add_widget(zoom_bar)

        # ── Equation inputs ─────────────────────────────────────
        eq_header = BoxLayout(size_hint_y=None, height=dp(30))
        eq_header.add_widget(Label(
            text="  Equations  (use [b]x[/b] as variable)",
            markup=True, color=DIM_COLOR, halign="left",
        ))
        self.add_widget(eq_header)

        self.eq_container = BoxLayout(
            orientation="vertical",
            size_hint_y=None,
            spacing=dp(4),
        )
        self.eq_container.bind(minimum_height=self.eq_container.setter("height"))

        scroll = ScrollView(size_hint_y=None, height=dp(180))
        scroll.add_widget(self.eq_container)
        self.add_widget(scroll)

        # Start with 3 rows
        for _ in range(3):
            self._add_equation_row()

        # ── Add / Plot buttons ───────────────────────────────────
        btn_row = BoxLayout(size_hint_y=None, height=dp(48), spacing=dp(8))

        add_btn = Button(
            text="+ Add",
            font_size=dp(15),
            background_color=BG_INPUT,
            color=ACCENT,
            background_normal="",
            size_hint_x=0.3,
        )
        add_btn.bind(on_release=lambda _: self._add_equation_row())

        plot_btn = Button(
            text="▶  Plot",
            font_size=dp(16),
            background_color=ACCENT,
            color=BG_DARK,
            background_normal="",
        )
        plot_btn.bind(on_release=lambda _: self._plot())

        btn_row.add_widget(add_btn)
        btn_row.add_widget(plot_btn)
        self.add_widget(btn_row)

        # ── Status label ────────────────────────────────────────
        self.status = Label(
            text="Enter an equation and tap Plot",
            color=DIM_COLOR,
            font_size=dp(12),
            size_hint_y=None,
            height=dp(24),
        )
        self.add_widget(self.status)

    # ── helpers ──────────────────────────────────────────────────
    def _update_bg(self, *args):
        self._bg_rect.pos  = self.pos
        self._bg_rect.size = self.size

    def _add_equation_row(self, *args):
        idx = len(self.equation_rows)
        color_hex = PLOT_COLORS[idx % len(PLOT_COLORS)]

        row = BoxLayout(size_hint_y=None, height=dp(44), spacing=dp(4))

        # colour swatch
        swatch = Widget(size_hint_x=None, width=dp(16))
        with swatch.canvas:
            r, g, b, a = get_color_from_hex(color_hex)
            Color(r, g, b, 1)
            Rectangle(pos=swatch.pos, size=swatch.size)
        swatch.bind(pos=lambda w, v: self._refresh_swatch(w, color_hex),
                    size=lambda w, v: self._refresh_swatch(w, color_hex))

        ti = TextInput(
            hint_text=f"e.g.  sin(x)  or  x**2 - 3",
            background_color=BG_INPUT,
            foreground_color=TEXT_COLOR,
            cursor_color=ACCENT,
            font_size=dp(15),
            multiline=False,
            padding=[dp(8), dp(10)],
        )
        ti._color_hex = color_hex

        del_btn = Button(
            text="✕",
            font_size=dp(14),
            size_hint_x=None,
            width=dp(36),
            background_color=BG_INPUT,
            color=ACCENT2,
            background_normal="",
        )
        del_btn.bind(on_release=lambda _, r=row, t=ti: self._remove_row(r, t))

        row.add_widget(swatch)
        row.add_widget(ti)
        row.add_widget(del_btn)

        self.eq_container.add_widget(row)
        self.equation_rows.append(ti)

    @staticmethod
    def _refresh_swatch(widget, color_hex):
        widget.canvas.clear()
        with widget.canvas:
            r, g, b, a = get_color_from_hex(color_hex)
            Color(r, g, b, 1)
            Rectangle(pos=widget.pos, size=widget.size)

    def _remove_row(self, row, ti):
        if len(self.equation_rows) <= 1:
            return
        self.eq_container.remove_widget(row)
        self.equation_rows.remove(ti)

    def _plot(self):
        equations = []
        errors    = []
        for ti in self.equation_rows:
            expr = ti.text.strip()
            if not expr:
                continue
            # quick validation
            try:
                safe_eval(expr, 1.0)
                equations.append((expr, ti._color_hex))
            except Exception as ex:
                errors.append(f"'{expr}': {ex}")

        if not equations:
            self.status.text = "⚠  No valid equations entered."
            self.status.color = ACCENT2
            return

        self.graph.set_equations(equations)
        msg = f"✔  Plotting {len(equations)} equation(s)"
        if errors:
            msg += f"  ·  {len(errors)} error(s)"
        self.status.text  = msg
        self.status.color = ACCENT


# ── App entry ────────────────────────────────────────────────────
class GraphPlotterApp(App):
    def build(self):
        Window.clearcolor = BG_DARK
        self.title = "Graph Plotter"
        return GraphPlotterLayout()


if __name__ == "__main__":
    GraphPlotterApp().run()
