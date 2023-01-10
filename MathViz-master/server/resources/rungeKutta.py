import math, sys
from flask import Blueprint, request, logging, current_app, Response, jsonify, flash
from flask.helpers import make_response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt

# import plotly.graph_objects as go
import io
import sympy as sp
import numpy as np
from prettytable import *
from sympy.core.symbol import var
from werkzeug.datastructures import ResponseCacheControl

rungeKutta = Blueprint("rungeKutta", __name__)


@rungeKutta.route("/run", methods=["POST"])
def post():
    # Code to accept input from the user.
    input = request.json
    x = var("x")
    y = var("y")
    dy_dx = input["dy_dx"]
    dy_dx = sp.sympify(dy_dx)
    x0 = sp.Rational(input["x0"])
    y0 = sp.Rational(input["y0"])
    xn = int(input["xn"])
    n = int(input["n"])
    if int(xn) >= int(x0):
        xn = sp.Rational(int(xn))
    else:
        flash("Value of xn must be greater than or equal to x0.")
    if int(n) > 0:
        h = sp.nsimplify((int(xn) - int(x0)) / int(n))
    else:
        flash("Number of partitions must be greater than 0.")

    current_app.logger.info(f"dy_dx = {dy_dx}, x0 = {x0}, y0 = {y0}")

    # Creating initial figure of required size.
    fig = plt.figure(num=None, figsize=(10, 10), dpi=80, facecolor="w", edgecolor="k")
    ax = fig.add_subplot(1, 1, 1)
    ax.spines["left"].set_position("zero")
    ax.spines["bottom"].set_position("zero")
    ax.spines["right"].set_color("none")
    ax.spines["top"].set_color("none")
    ax.xaxis.set_ticks_position("bottom")
    ax.yaxis.set_ticks_position("left")

    x0 = float(x0)
    y0 = float(y0)
    xn = float(xn)
    h = float(h)
    l = xn - x0

    X = []
    X.append(float(sp.nsimplify(x0)))
    for i in range(1, int(n) + 1):
        t = X[i - 1] + h
        X.append(float(sp.nsimplify(t)))

    Y = [float(sp.nsimplify(0)) for i in range(int(n) + 1)]
    Y[0] = float(sp.nsimplify(y0))

    try:
        plt.xlabel("x")
        plt.ylabel("y")
        plt.scatter(x0, y0, color="red", marker="o")
        plt.vlines(x=X[0], ymin=0, ymax=Y[0])

        for i in range(int(n)):
            xf_plot = np.linspace(float(X[i]), float(X[i + 1]), 20)
            m1 = float(sp.nsimplify(dy_dx.subs([(x, X[i]), (y, Y[i])])))
            k1 = h * m1

            c = float(sp.nsimplify(Y[i] - m1 * X[i]))
            y_plot = [float(m1 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "indigo", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m1))

            m2 = float(
                sp.nsimplify(dy_dx.subs([(x, X[i] + h / 2), (y, Y[i] + h * (m1 / 2))]))
            )
            k2 = h * m2

            c = float(sp.nsimplify(Y[i] - m2 * X[i]))
            y_plot = [float(m2 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "blue", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m2))

            m3 = float(
                sp.nsimplify(dy_dx.subs([(x, X[i] + h / 2), (y, Y[i] + h * (m2 / 2))]))
            )
            k3 = h * m3

            c = float(sp.nsimplify(Y[i] - m3 * X[i]))
            y_plot = [float(m3 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "green", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m3))

            m4 = float(sp.nsimplify(dy_dx.subs([(x, X[i + 1]), (y, Y[i] + h * m3)])))
            k4 = h * m4

            c = float(sp.nsimplify(Y[i] - m4 * X[i]))
            y_plot = [float(m4 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "yellow", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m4))

            k = float(sp.nsimplify((1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4)))

            c = float(sp.nsimplify(Y[i] - (k / h) * X[i]))
            y_plot = [float((k / h) * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "red", linewidth=2)
            Y[i + 1] = float(sp.nsimplify(Y[i] + k))
            plt.vlines(x=X[i + 1], ymin=0, ymax=Y[i + 1])

        plt.vlines(x=X[n], ymin=0, ymax=Y[n])
        plt.scatter(X[-1], Y[-1], color="red", marker="o")
        plt.annotate(
            "$ \ Y( $" + sp.latex(int(xn)) + "$)=$" + sp.latex(round(Y[-1], 6)),
            (X[-1], Y[-1]),
            size=15,
            rotation=0,
        )
        
    except Exception as e:
        current_app.logger.exception("Something went wrong")
        ax.set_title("Error: Something went wrong")

    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype="image/png")


@rungeKutta.route("/runtable", methods=["POST"])
def post1():
    x = var("x")
    y = var("y")
    # Code to accept input from the user.
    input = request.json
    dy_dx = input["dy_dx"]
    dy_dx = sp.sympify(dy_dx)
    x0 = sp.Rational(input["x0"])
    y0 = sp.Rational(input["y0"])
    xn = input["xn"]
    if int(xn) >= int(x0):
        xn = sp.Rational(int(xn))
    else:
        flash("Value of xn must be greater than or equal to x0.")
    n = input["n"]
    if int(n) > 0:
        h = sp.nsimplify((int(xn) - int(x0)) / int(n))
    else:
        flash("Number of partitions must be greater than 0.")

    current_app.logger.info(f"dy_dx = {dy_dx}, x0 = {x0}, y0 = {y0}")

    # Creating initial figure of required size.
    fig = plt.figure(num=None, figsize=(10, 10), dpi=80, facecolor="w", edgecolor="k")
    ax = fig.add_subplot(1, 1, 1)
    ax.spines["left"].set_position("zero")
    ax.spines["bottom"].set_position("zero")
    ax.spines["right"].set_color("none")
    ax.spines["top"].set_color("none")
    ax.xaxis.set_ticks_position("bottom")
    ax.yaxis.set_ticks_position("left")

    x0 = float(x0)
    y0 = float(y0)
    xn = float(int(xn))
    h = float(h)
    l = xn - x0

    X = []
    X.append(float(sp.nsimplify(x0)))
    for i in range(1, int(n) + 1):
        t = X[i - 1] + h
        X.append(float(sp.nsimplify(t)))

    Y = [float(sp.nsimplify(0)) for i in range(int(n) + 1)]
    Y[0] = float(sp.nsimplify(y0))

    try:
        plt.xlabel("x")
        plt.ylabel("y")
        plt.scatter(x0, y0, color="red", marker="o")
        plt.vlines(x=X[0], ymin=0, ymax=Y[0])

        for i in range(int(n)):
            xf_plot = np.linspace(float(X[i]), float(X[i + 1]), 20)
            m1 = float(sp.nsimplify(dy_dx.subs([(x, X[i]), (y, Y[i])])))
            k1 = h * m1

            c = float(sp.nsimplify(Y[i] - m1 * X[i]))
            y_plot = [float(m1 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "indigo", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m1))

            m2 = float(
                sp.nsimplify(dy_dx.subs([(x, X[i] + h / 2), (y, Y[i] + h * (m1 / 2))]))
            )
            k2 = h * m2

            c = float(sp.nsimplify(Y[i] - m2 * X[i]))
            y_plot = [float(m2 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "blue", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m2))

            m3 = float(
                sp.nsimplify(dy_dx.subs([(x, X[i] + h / 2), (y, Y[i] + h * (m2 / 2))]))
            )
            k3 = h * m3

            c = float(sp.nsimplify(Y[i] - m3 * X[i]))
            y_plot = [float(m3 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "green", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m3))

            m4 = float(sp.nsimplify(dy_dx.subs([(x, X[i + 1]), (y, Y[i] + h * m3)])))
            k4 = h * m4

            c = float(sp.nsimplify(Y[i] - m4 * X[i]))
            y_plot = [float(m4 * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "yellow", linestyle="--", linewidth=1)
            Y[i + 1] = float(sp.nsimplify(Y[i] + h * m4))

            k = float(sp.nsimplify((1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4)))

            c = float(sp.nsimplify(Y[i] - (k / h) * X[i]))
            y_plot = [float((k / h) * xf_plot[j] + c) for j in range(len(xf_plot))]
            plt.plot(xf_plot, y_plot, "red", linewidth=2)
            Y[i + 1] = float(sp.nsimplify(Y[i] + k))
            plt.vlines(x=X[i + 1], ymin=0, ymax=Y[i + 1])

        plt.vlines(x=X[n], ymin=0, ymax=Y[n])
        plt.scatter(X[-1], Y[-1], color="red", marker="o")
        plt.annotate(
            "$ \ Y( $" + sp.latex(int(xn)) + "$)=$" + sp.latex(round(Y[-1], 6)),
            (X[-1], Y[-1]),
            size=15,
            rotation=0,
        )

        Error_Y = []
        t = PrettyTable()
        t.add_column("X", X)
        t.add_column("Y", Y)
        img = t.get_html_string()

        dataImg = {"Img": img}
        return jsonify(dataImg)

    except Exception as e:
        current_app.logger.exception("Something went wrong")
        ax.set_title("Error: Something went wrong")
