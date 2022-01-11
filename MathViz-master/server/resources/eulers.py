import numpy as np
import sympy as sp
import io
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from flask.helpers import make_response
from flask import Blueprint, request, logging, current_app, Response, jsonify
from math import *
import sys

eulers = Blueprint("eulers", __name__)


@eulers.route("/run", methods=["POST"])
def post():
    input = request.json
    # x = sp.Rational('x0')
    # y = sp.Rational('y0')
    x = sp.var("x")
    y = sp.var("y")
    partitions = input["partitions"] if "partitions" in input else None
    fx = input["fx"]
    fx = sp.sympify(fx)

    x0 = float(input["x0"])
    y0 = float(input["y0"])

    xn = float(input["xn"])
    h = sp.nsimplify((xn - x0) / partitions)
    print(x0)
    current_app.logger.info(
        f"fx = {fx},  x0 = {x0} y0 = {y0} xn = {xn} partitions = {partitions}"
    )

    fig = Figure(figsize=(10, 10), dpi=80, facecolor="w", edgecolor="k")
    ax = fig.subplots()

    try:
        ax.set_title(f"Eulers Method")

        ax.set_xlabel("x")
        ax.set_ylabel("y")
        ax.axvline(x=0, color="b")
        ax.axhline(y=0, color="b")
        # ax.vlines(x=x_l, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))
        # ax.vlines(x=x_u, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))

        # PART : 2
        if partitions:
            x0 = float(x0)
            y0 = float(y0)
            xn = float(xn)
            h = float(h)
            l = float(xn - x0)
            n = partitions

            X = []
            X.append(x0)
            for i in range(1, n + 1):
                t = float(X[i - 1] + h)
                X.append(t)

            Y = []
            Y.append(y0)

            for i in range(n):
                ax.vlines(x=X[i], ymin=0, ymax=Y[i])
                x_plot = np.linspace(X[i], X[i + 1], 20)
                m = fx.subs([(x, X[i]), (y, Y[i])])
                c = Y[i] - m * X[i]
                y_plot = [float(m * x_plot[j] + c) for j in range(len(x_plot))]
                ax.plot(x_plot, y_plot)
                Y.append(float(y_plot[19]))

            ax.vlines(x=X[n], ymin=0, ymax=Y[n])
    except Exception as e:
        current_app.logger.exception("Something went wrong")
        ax.set_title("Error: Something went wrong")

    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype="image/png")


@eulers.route("/runtable", methods=["POST"])
def post1():
    input = request.json
    x = sp.var("x")
    y = sp.var("y")
    partitions = input["partitions"] if "partitions" in input else None
    fx = input["fx"]
    fx = sp.sympify(fx)
    
    x0 = float(input["x0"])
    y0 = float(input["y0"])

    xn = float(input["xn"])

    # x0 = sp.Rational("x0")
    # y0 = sp.Rational("y0")

    # xn = sp.Rational("xn")
    h = sp.nsimplify((xn - x0) / partitions)
    print(x0)
    X = None
    Y = None
    euler = None
    I = None
    points = None  # 1st column
    Dy = None
    slope = None
    try:
        if partitions:
            
            x0 = round(float(x0), 10)
            y0 = round(float(y0), 10)
            xn = round(float(xn), 10)
            h = round(float(h), 10)
            l = round(float(xn - x0), 10)
            n = partitions

            X = []
            X.append(round(float(x0), 10))
            for i in range(1, n + 1):
                t = round(float(X[i - 1] + h), 10)
                X.append(t)

            Y = []
            Y.append(round(float(y0), 10))

            points = []  # 1st column
            Dy = []
            slope = []
            for i in range(n):
                x_plot = np.linspace(X[i], X[i + 1], 20)
                m = fx.subs([(x, X[i]), (y, Y[i])])
                temp_point = round(float(X[i]), 10)
                points.append(temp_point)
                Dy.append(round(float(m), 10))
                slope.append(round(float(atan(m) * 180 / pi), 10))
                c = Y[i] - m * X[i]
                y_plot = [float(m * x_plot[j] + c) for j in range(len(x_plot))]
                Y.append(round(float(y_plot[19]), 10))

            Y_x = [float(Y[i + 1]) for i in range(len(Y) - 1)]

            euler = Y_x[-1]
            I = Y[-1]

    except Exception as e:
        current_app.logger.exception("Something went wrong")

    lst1 = []
    for i in range(len(points)):
        lst1.append(
            {
                "key": i,
                "one": points[i], 
                "two": Dy[i],
                "three": slope[i],
                "four": Y_x[i],
            }
        )

    lst2 = []
    for i in range(len(X)):
        lst2.append({"key": i, "one": X[i], "two": Y[i]})

    dataStr = {"table1": lst1, "table2": lst2, "area1": euler, "area2": I}

    return jsonify(dataStr)