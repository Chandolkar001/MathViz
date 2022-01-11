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
from PIL import Image, ImageDraw, ImageFont
from sympy.core.symbol import var
from werkzeug.datastructures import ResponseCacheControl

newtonForward = Blueprint("newtonForward", __name__)


@newtonForward.route("/run", methods=["POST"])
def post():
    # Code to accept input from the user.
    input = request.json
    x0 = [sp.nsimplify(i) for i in input["x0"].split(",")]
    y0 = [sp.nsimplify(i) for i in input["y0"].split(",")]

    if len(x0) == len(y0):
        for i in range(len(x0)):
            x0[i] = round(float(x0[i]), 5)
            y0[i] = round(float(y0[i]), 5)
    else:
        flash("Both the input arrays must be of same length.")

    current_app.logger.info(f"x0 = {x0}, y0 = {y0}")

    # Creating initial figure of required size.
    x = sp.symbols("x")
    fig = Figure(figsize=(10, 10), dpi=80, facecolor="w", edgecolor="k")
    ax = fig.subplots()

    try:
        # Plot a scatterplot for given values of x0 and y0.
        ax.set_title(f"Newton Forward Interpolation")
        ax.set_xlabel("x")
        ax.set_ylabel("y")

        ax.axvline(x=0, color="b")
        ax.axhline(y=0, color="b")
        ax.scatter(x0, y0, c="blue", marker="o", linewidths=4)

    except Exception as e:
        current_app.logger.exception("Something went wrong")
        ax.set_title("Error: Something went wrong")

    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype="image/png")


@newtonForward.route("/table", methods=["POST"])
def table():
    """
    This function creates forward interpolationg table for the given function.
    """

    # Code to accept input from the user.
    input = request.json
    x0 = [sp.nsimplify(i) for i in input["x0"].split(",")]
    y0 = [sp.nsimplify(i) for i in input["y0"].split(",")]
    if len(x0) == len(y0):
        for i in range(len(x0)):
            x0[i] = round(float(x0[i]), 5)
            y0[i] = round(float(y0[i]), 5)
    else:
        flash("Both the input arrays must be of same length.")

    current_app.logger.info(f"x0 = {x0}, y0 = {y0}")

    X = x0.copy()
    Y = y0.copy()
    n = len(X)

    D = [Y]
    t = PrettyTable()
    t.add_column("x", X)
    t.add_column("y", Y)
    k = 0
    h = "∆"

    try:
        while k < n - 1:
            d = []
            for i in range(n - k - 1):
                # d.append(float(sp.nsimplify(D[k][i+1]-D[k][i])))
                d.append(round(D[k][i + 1] - D[k][i], 10))

            for i in range(n - k - 1, n):
                d.append(" ")
            D.append(d)

            header = str(h) + str(k + 1) + "y"
            t.add_column(header, d)
            k = k + 1
        img = t.get_html_string()
        # return Response(img)
        dataImg = {"Img": img}

        return jsonify(dataImg)


    except Exception as e:
        current_app.logger.exception("Something went wrong")
        # print(e)
        # ax.set_title("Error: Something went wrong")



@newtonForward.route("/runtable", methods=["POST"])
def post1():
    # Code to accept input from the user.
    input = request.json
    # partitions = input['partitions'] if 'partitions' in input else None
    x0 = [sp.nsimplify(i) for i in input["x0"].split(",")]
    y0 = [sp.nsimplify(i) for i in input["y0"].split(",")]
    if len(x0) == len(y0):
        for i in range(len(x0)):
            x0[i] = round(float(x0[i]), 5)
            y0[i] = round(float(y0[i]), 5)
    else:
        flash("Both the input arrays must be of same length.")

    current_app.logger.info(f"x0 = {x0}, y0 = {y0}")

    x = sp.symbols("x")
    fig = Figure(figsize=(10, 10), dpi=80, facecolor="w", edgecolor="k")
    ax = fig.subplots()

    X = x0.copy()
    Y = y0.copy()
    n = len(X)

    D = [Y]
    t = PrettyTable()
    t.add_column("x", X)
    t.add_column("y", Y)
    k = 0
    h = "∆"
    while k < n - 1:
        d = []
        for i in range(n - k - 1):
            # d.append(float(sp.nsimplify(D[k][i+1]-D[k][i])))
            d.append(round(D[k][i + 1] - D[k][i], 10))

        for i in range(n - k - 1, n):
            d.append(" ")
        D.append(d)

        header = str(h) + str(k + 1) + "y"
        t.add_column(header, d)
        k = k + 1
    try:
        h = sp.nsimplify(X[1] - X[0])
        u = r"\frac{" + sp.latex(x - X[0]) + r"}{" + sp.latex(h) + r"}"
        u1 = x - X[0]
        u2 = r"\frac{" + sp.latex(x - X[0]) + r"}{" + sp.latex(h) + r"}"
        expr1 = r"\left(" + u + r"\right)"
        expr = (
            r"y=f(x)="
            + sp.latex(D[0][0])
            + r"+ \left("
            + u
            + r"\right) \left("
            + sp.latex(D[1][0])
            + r" \right)"
        )

        expr2 = expr
        expr3 = (
            r"\left( \frac{" + sp.latex(x - X[0]) + r"}{" + sp.latex(h) + r"} \right)"
        )
        for i in range(2, n):
            expr1 = expr1 + r"\left( " + u + r"-" + sp.latex(i - 1) + r"\right)"
            # expr1=expr1 + u+r'-'+sp.latex(i-1)
            expr = (
                expr
                + r"+"
                + r"\frac{1}{"
                + sp.latex(i)
                + "!}"
                + expr1
                + r"\left("
                + sp.latex(D[i][0])
                + r"\right)"
            )

            expr3 = (
                expr3
                + r"\left( \frac{"
                + sp.latex(x - X[0] - (i - 1) * h)
                + r"}{"
                + sp.latex(h)
                + r"} \right)"
            )
            expr2 = (
                expr2
                + r"+"
                + r"\frac{1}{"
                + sp.latex(i)
                + r"!}"
                + expr3
                + r"\left("
                + sp.latex(D[i][0])
                + r"\right)"
            )
            # display(Math(expr3))

            p = (x - X[0]) / h
            m = 1
            f = D[0][0]
            t = 0
            for i in range(1, n):
                m = m * (p - i + 1) / i
                t = D[i][0]
                f = f + m * t

            a = sp.Poly(f, x)
            coeff = a.all_coeffs()
            p1 = np.poly1d(coeff)

        ax.set_title(f"Newton Forward Interpolation")
        ax.set_xlabel("x")
        ax.set_ylabel("y")

        ax.axvline(x=0, color="b")
        ax.axhline(y=0, color="b")
        ax.scatter(x0, y0, c="blue", marker="o", linewidths=4)

        xpl = np.linspace(float(min(x0) - 0.2), float(max(x0) + 0.1), 1000)
        ypl = [(f.subs(x, i)) for i in xpl]
        ax.plot(xpl, ypl, "r")

    except Exception as e:
        current_app.logger.exception("Something went wrong")
        # ax.set_title('Error: Something went wrong')

    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype="image/png")


@newtonForward.route("/runner", methods=["POST"])
def post2():
    input = request.json
    xc = sp.Rational(input["xc"]) if "xc" in input else None
    x0 = [sp.nsimplify(i) for i in input["x0"].split(",")]
    y0 = [sp.nsimplify(i) for i in input["y0"].split(",")]
    if len(x0) == len(y0):
        for i in range(len(x0)):
            x0[i] = round(float(x0[i]), 5)
            y0[i] = round(float(y0[i]), 5)
    else:
        flash("Both the input arrays must be of same length.")

    X = x0.copy()
    Y = y0.copy()
    n = len(X)
    D = [Y]
    t = PrettyTable()
    t.add_column("x", X)
    t.add_column("y", Y)
    k = 0
    h = "∆"
    while k < n - 1:
        d = []
        for i in range(n - k - 1):
            # d.append(float(sp.nsimplify(D[k][i+1]-D[k][i])))
            d.append(round(D[k][i + 1] - D[k][i], 10))

        for i in range(n - k - 1, n):
            d.append(" ")
        D.append(d)

        header = str(h) + str(k + 1) + "y"
        t.add_column(header, d)
        k = k + 1
    x = sp.symbols("x")
    if xc:
        h = sp.nsimplify(X[1] - X[0])
        u = r"\frac{" + sp.latex(x - X[0]) + r"}{" + sp.latex(h) + r"}"
        u1 = x - X[0]
        u2 = r"\frac{" + sp.latex(x - X[0]) + r"}{" + sp.latex(h) + r"}"
        expr1 = r"\left(" + u + r"\right)"
        expr = (
            r"y=f(x)="
            + sp.latex(D[0][0])
            + r"+ \left("
            + u
            + r"\right) \left("
            + sp.latex(D[1][0])
            + r" \right)"
        )

        expr2 = expr
        expr3 = (
            r"\left( \frac{" + sp.latex(x - X[0]) + r"}{" + sp.latex(h) + r"} \right)"
        )
        for i in range(2, n):
            expr1 = expr1 + r"\left( " + u + r"-" + sp.latex(i - 1) + r"\right)"
            # expr1=expr1 + u+r'-'+sp.latex(i-1)
            expr = (
                expr
                + r"+"
                + r"\frac{1}{"
                + sp.latex(i)
                + "!}"
                + expr1
                + r"\left("
                + sp.latex(D[i][0])
                + r"\right)"
            )

            expr3 = (
                expr3
                + r"\left( \frac{"
                + sp.latex(x - X[0] - (i - 1) * h)
                + r"}{"
                + sp.latex(h)
                + r"} \right)"
            )
            expr2 = (
                expr2
                + r"+"
                + r"\frac{1}{"
                + sp.latex(i)
                + r"!}"
                + expr3
                + r"\left("
                + sp.latex(D[i][0])
                + r"\right)"
            )
            # display(Math(expr3))

            p = (x - X[0]) / h
            m = 1
            f = D[0][0]
            t = 0
            for i in range(1, n):
                m = m * (p - i + 1) / i
                t = D[i][0]
                f = f + m * t

        a = sp.Poly(f, x)
        coeff = a.all_coeffs()
        p1 = np.poly1d(coeff)

        try:
            val = np.polyval(coeff, xc)
            # val1 = round(val, 2)
        except Exception as e:
            current_app.logger.exception("Something went wrong")

        dataStr = {"Answer": str(round(val,5))}

        return jsonify(dataStr)
    else:
        pass
