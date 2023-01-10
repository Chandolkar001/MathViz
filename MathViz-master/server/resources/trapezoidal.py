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

trapezoidal = Blueprint("trapezoidal", __name__)

# Declared globally


@trapezoidal.route("/run", methods=["POST"])
def post1():
    input = request.json
    partitions = input["partitions"] if "partitions" in input else None
    print(input)
    fx = input["fx"]
    fx = sp.sympify(fx)
    mode = input["mode"]
    x_l = sp.nsimplify(input["x_l"])
    x_u = sp.nsimplify(input["x_u"])
    if mode == "degrees":
        x_l = x_l * 3.141592653589793 / 180
        x_u = x_u * 3.141592653589793 / 180
    x_l = float(x_l)
    x_u = float(x_u)

    check_log = 0
    str_fx = str(fx)
    for i in range(len(str_fx)):
        if str_fx[i : i + 3] == "log":
            check_log = 1
    current_app.logger.info(
        f"fx = {fx}, mode = {mode}, x_l = {x_l} x_u = {x_u} partitions = {partitions}"
    )

    fig = Figure(figsize=(10, 10), dpi=80, facecolor="w", edgecolor="k")
    ax = fig.subplots()

    try:
        ax.set_title(f"Trapezoidal: plot of f = {fx}")

        ax.set_xlabel("x")
        ax.set_ylabel("y")

        step_size = 0.01  # (x_u - x_l + 1) / 10000.0

        x_plot = np.arange(x_l, x_u + step_size, step_size)
        # current_app.logger.info(f'{x_plot}')
        y_plot = []
        x = sp.var("x")
        for i in range(len(x_plot)):
            y_plot.append(float(sp.limit(fx, x, x_plot[i])))

        # current_app.logger.info(f'{y_plot}')

        ax.plot(x_plot, y_plot, "r")
        ax.axvline(x=0, color="b")
        ax.axhline(y=0, color="b")
        ax.vlines(x=x_l, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))
        ax.vlines(x=x_u, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))

    except Exception as e:
        current_app.logger.exception("Something went wrong")
        ax.set_title("Error: Something went wrong")
        print(e)


    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype="image/png")

@trapezoidal.route('/runGraphsII',methods=["POST"])
def post2():
    input = request.json
    partitions = input["partitions"] if "partitions" in input else None
    print(input)
    fx = input["fx"]
    fx = sp.sympify(fx)
    mode = input["mode"]
    x_l = sp.nsimplify(input["x_l"])
    x_u = sp.nsimplify(input["x_u"])
    if mode == "degrees":
        x_l = x_l * 3.141592653589793 / 180
        x_u = x_u * 3.141592653589793 / 180
    x_l = float(x_l)
    x_u = float(x_u)

    check_log = 0
    str_fx = str(fx)
    for i in range(len(str_fx)):
        if str_fx[i : i + 3] == "log":
            check_log = 1
    current_app.logger.info(
        f"fx = {fx}, mode = {mode}, x_l = {x_l} x_u = {x_u} partitions = {partitions}"
    )

    fig = Figure(figsize=(10, 10), dpi=80, facecolor="w", edgecolor="k")
    ax = fig.subplots()

    try:
        ax.set_title(f"Trapezoidal: plot of f = {fx}")

        ax.set_xlabel("x")
        ax.set_ylabel("y")

        step_size = 0.01  # (x_u - x_l + 1) / 10000.0

        x_plot = np.arange(x_l, x_u + step_size, step_size)
        # current_app.logger.info(f'{x_plot}')
        y_plot = []
        x = sp.var("x")
        for i in range(len(x_plot)):
            y_plot.append(float(sp.limit(fx, x, x_plot[i])))

        # current_app.logger.info(f'{y_plot}')

        ax.plot(x_plot, y_plot, "r")
        ax.axvline(x=0, color="b")
        ax.axhline(y=0, color="b")
        ax.vlines(x=x_l, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))
        ax.vlines(x=x_u, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))

        f = fx
        n = partitions
        h = (x_u - x_l) / n
        X = []
        Y = []
        x_temp = x_l
        if check_log == 1:
            for i in range(n + 1):
                X.append(x_temp)
                if x_temp == 0:
                    Y.append(float(sp.limit(f, x, x_temp + 0.0000001)))
                else:
                    Y.append(float(sp.limit(f, x, x_temp)))
                x_temp = x_temp + h
        else:
            for i in range(n + 1):
                X.append(x_temp)
                Y.append(float(sp.limit(f, x, x_temp)))
                x_temp = x_temp + h

        for i in range(n):
            ax.vlines(x=X[i], ymin=0, ymax=Y[i])
            ax.plot([X[i], X[i + 1]], [Y[i], Y[i + 1]])
        ax.vlines(x=X[n], ymin=0, ymax=Y[n])

    except Exception as e:
        current_app.logger.exception("Something went wrong")
        ax.set_title("Error: Something went wrong")
        print(e)

    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype="image/png")

@trapezoidal.route("/runtable", methods=["POST"])
def post3():
    input = request.json
    partitions = input["partitions"] if "partitions" in input else None
    print(input)
    fx = input["fx"]
    fx = sp.sympify(fx)
    mode = input["mode"]
    x_l = sp.nsimplify(input["x_l"])
    x_u = sp.nsimplify(input["x_u"])
    if mode == "degrees":
        x_l = x_l * 3.141592653589793 / 180
        x_u = x_u * 3.141592653589793 / 180
    x_l = float(x_l)
    x_u = float(x_u)

    check_log = 0
    str_fx = str(fx)
    for i in range(len(str_fx)):
        if str_fx[i : i + 3] == "log":
            check_log = 1
    X0 = None
    Y0 = None
    trapezoid = None
    I = None
    try:
        x = sp.var("x")
        if partitions:
            f = fx
            n = partitions
            h = (x_u - x_l) / n
            X = []
            Y = []
            x_temp = x_l
            if check_log == 1:
                for i in range(n + 1):
                    X.append(x_temp)
                    if x_temp == 0:
                        Y.append(float(sp.limit(f, x, x_temp + 0.0000001)))
                    else:
                        Y.append(float(sp.limit(f, x, x_temp)))
                    x_temp = x_temp + h
            else:
                for i in range(n + 1):
                    X.append(x_temp)
                    Y.append(float(sp.limit(f, x, x_temp)))
                    x_temp = x_temp + h

            X0 = []
            Y0 = []
            for i in range(len(X)):
                try:
                    X0.append(sp.nsimplify(X[i]).limit_denominator())

                except:
                    try:
                        X0.append(sp.nsimplify(X[i]))
                    except:
                        X0.append(float(X[i]))
                # print(sp.nsimplify(X[i]))
                Y0.append(float(Y[i]))

            # if (check_log==1):
            #     for i in range(n+1):
            #         if (X0[i]=='$ \large{ x_{0} =0}$'):
            #             X0[i]='$ \large{ x_{0} =0.0000001}$'

            for j in range(0, len(X0)):
                X0[j] = str(X0[j]).replace("pi", "𝛑")
                X0[j] = str(X0[j]).replace("*", "")

            trapezoid = Y[0] + Y[n]

            for i in range(1, n):
                trapezoid = trapezoid + 2 * Y[i]

            trapezoid = float((h / 2) * trapezoid)
            I = float(sp.integrate(f, (x, x_l, x_u)))

    except Exception as e:
        current_app.logger.exception("Something went wrong")

    lst = []
    print(X0)
    for i in range(len(X0)):
        lst.append({"key": i, "one": X0[i], "two": Y0[i]})

    dataStr = {"a": lst, "area1": trapezoid, "area2": I}

    print(X)
    return jsonify(dataStr)
