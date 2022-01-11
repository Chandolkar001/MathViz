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

modifiedEulers = Blueprint('modifiedEulers', __name__)


@modifiedEulers.route('/run', methods=['POST'])
def post():

    input = request.json
    x = sp.var('x')
    y = sp.var('y')
    partitions = input['partitions'] if 'partitions' in input else None
    fx = input['fx']
    fx = sp.sympify(fx)

    # x0 = sp.Rational('x0')
    # y0 = sp.Rational('y0')

    # xn = float(input['xn'])

    x0 = float(input["x0"])
    y0 = float(input["y0"])

    xn = float(input["xn"])
    h = sp.nsimplify((xn-x0)/partitions)

    current_app.logger.info(
        f'fx = {fx},  x0 = {x0} y0 = {y0} xn = {xn} partitions = {partitions}')

    fig = Figure(figsize=(10, 10), dpi=80, facecolor='w', edgecolor='k')
    ax = fig.subplots()

    try:
        ax.set_title(f'Modified Eulers Method')

        ax.set_xlabel('x')
        ax.set_ylabel('y')
        ax.axvline(x=0, color='b')
        ax.axhline(y=0, color='b')
        # ax.vlines(x=x_l, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))
        # ax.vlines(x=x_u, ymin=min(min(y_plot), 0), ymax=max(max(y_plot), 0))

        # PART : 2
        if partitions:
            Corrections = 1
            x0 = float(x0)
            y0 = float(y0)
            xn = float(xn)
            h = float(h)
            l = float(xn-x0)
            n = partitions

            X0 = []
            X0.append(x0)
            for i in range(1, n+1):
                t = float(X0[i-1]+h)
                X0.append(t)

            Yp = []
            Yp.append(float(y0))

            Yc = []
            Yc.append(float(y0))

            corrected_values = [[(y0) for i in range(Corrections)]]

            for i in range(n):
                m1 = float(np.real(fx.subs([(x, X0[i]) , (y, Yc[i])])))
                yp = float(np.real(Yc[i]+h*m1))
                Yp.append(float(yp))  #Predicted values of Y
                m2 = float(np.real(fx.subs([(x,X0[i+1]), (y, Yp[i+1])])))
                yc = float(np.real(Yc[i]+(h/2)*(m1+m2)))
                Yc.append(yc)
                cv_Yc = [yc]

                count = 1
                while(count <= Corrections - 1):
                    m2 = float(np.real(fx.subs([(x,X0[i+1]), (y,Yc[i+1])])))
                    yc = float(np.real(Yc[i]+(h/2)*(m1+m2)))
                    Yc[i+1] = yc
                    cv_Yc.append(yc)
                    m = 0.5*(m1+m2)
                    count = count + 1

                corrected_values.append(cv_Yc) #corrected  values of Y

            corrected_values1 = [[(0) for i in range(n+1)] for j in range(Corrections)]
            for i in range(n+1):
                for j in range(Corrections):
                    corrected_values1[j][i] = corrected_values[i][j]
            
            corrected_values = np.array(corrected_values, dtype=float)
            corrected_values1 = np.transpose(corrected_values)

            values_Y = [[(Yp[i])] for i in range(n+1)]
            for i in range(n+1):
                for j in range(Corrections):
                    values_Y[i].append(corrected_values[i][j])
            
            for i in range(n+1):
                ax.vlines(x = X0[i], ymin = 0, ymax = max(values_Y[i]))
          
            for i in range(n):
                ax.plot([X0[i],X0[i+1]],[Yc[i],Yp[i+1]], color='violet', linestyle='--', marker = 'o')     # Plot for Predicted values
                for j in range(Corrections-1):                                                            # Plot for Corrected values     
                    ax.plot([X0[i],X0[i+1]],[Yc[i],values_Y[i+1][j+1]], linestyle='--', marker = 'o')

            ax.plot(X0, Yc, color='red', marker = 'o')                                                    # Plot for Final values
            # plt.annotate("$ \ Y(x_n)=$"+sp.latex(round(Yc[-1],10)), (X[-1],Yc[-1]), size=15,color='red',rotation=0)



                # ax.vlines(x=X[i], ymin=0, ymax=Y[i])
                # x_plot = np.linspace(X[i], X[i+1], 20)
                # m = fx.subs([(x, X[i]), (y, Y[i])])
                # c = Y[i]-m*X[i]
                # y_plot = [float(m*x_plot[j] + c) for j in range(len(x_plot))]
                # ax.plot(x_plot, y_plot)
                # Y.append(float(y_plot[19]))

            # ax.vlines(x=X[n], ymin=0, ymax=Y[n])

    except Exception as e:
        current_app.logger.exception('Something went wrong')
        ax.set_title('Error: Something went wrong')

    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype='image/png')


@modifiedEulers.route('/runtable', methods=['POST'])
def post1():
    input = request.json
    x = sp.var('x')
    y = sp.var('y')
    partitions = input['partitions'] if 'partitions' in input else None
    fx = input['fx']
    fx = sp.sympify(fx)

    x0 = float(input["x0"])
    y0 = float(input["y0"])
    xn = float(input["xn"])
    # x0 = sp.rational('x0')
    # y0 = sp.rational('y0')

    # xn = sp.rational('xn')
    h = sp.nsimplify((xn-x0)/partitions)

    X = None
    Y = None
    euler = None
    I = None
    try:
        if partitions:
            Corrections = 1
            x0 = round(float(x0), 10)
            y0 = round(float(y0), 10)
            xn = round(float(xn), 10)
            h = round(float(h), 10)
            l = round(float(xn-x0), 10)
            n = partitions

            X0 = []
            X0.append(round(float(x0), 10))
            for i in range(1, n+1):
                t = round(float(X0[i-1]+h), 10)
                X0.append(t)

            Yp = []
            Yp.append(round(float(y0), 10))

            Yc = []
            Yc.append(round(float(y0), 10))

            corrected_values = [[(y0) for i in range(Corrections)]]

            for i in range(n):
                m1 = round(float(np.real(fx.subs([(x, X0[i]) , (y, Yc[i])]))),10)
                yp = round(float(np.real(Yc[i]+h*m1)),10)
                Yp.append(float(yp))
                m2 = round(float(np.real(fx.subs([(x,X0[i+1]), (y, Yp[i+1])]))),10)
                yc=round(float(np.real(Yc[i]+(h/2)*(m1+m2))),10)                                      #corrected value
                Yc.append(yc) 
                cv_Yc=[yc]  
               
                #Correction formula
                count = 1
                while(count <= Corrections - 1):
                    m2 = round(float(np.real(fx.subs([(x,X0[i+1]), (y,Yc[i+1])]))),10)
                    yc = round(float(np.real(Yc[i]+(h/2)*(m1+m2))), 10)
                    Yc[i+1] = yc
                    cv_Yc.append(yc)
                    m = 0.5*(m1+m2)
                    count = count + 1

                corrected_values.append(cv_Yc)
            current_app.logger.info(
        f'corrected values = {corrected_values}')
            print(xn*1000000000000)


            # X = []
            # X.append(round(float(x0), 10))
            # for i in range(1, n+1):
            #     t = round(float(X[i-1]+h), 10)
            #     X.append(t)

            # Y = []
            # Y.append(round(float(y0), 10))

            # points = []  # 1st column
            # # Dy = []
            # # slope = []
            # for i in range(n):
            #     x_plot = np.linspace(X[i], X[i+1], 20)
            #     m = fx.subs([(x, X[i]), (y, Y[i])])
            #     temp_point = round(float(X[i]), 10)
            #     points.append(temp_point)
            #     Dy.append(round(float(m), 10))
            #     slope.append(round(float(atan(m)*180/pi), 10))
            #     c = Y[i]-m*X[i]
            #     y_plot = [float(m*x_plot[j] + c) for j in range(len(x_plot))]
            #     Y.append(round(float(y_plot[19]), 10))

            # Y_x = [float(Y[i+1]) for i in range(len(Y)-1)]
        
            Meuler = Yc[-1]
            # I = Y[-1]
        

    except Exception as e:
        current_app.logger.exception('Something went wrong')

    # lst1 = []
    # for i in range(len(points)):
    #     lst1.append(
    #         {"key": i, "points": points[i], "Dy": Dy[i], "slope": slope[i], "Y_x": Y_x[i]})

    lst1 = []
    for i in range(0, len(X0)):
        lst1.append({"key": str(i), "one": str(X0[i]), "two": str(Yp[i]), "three": str(Yc[i])})

    dataStr = {
        "a": lst1,
        "area1": Meuler,
    }

    return jsonify(dataStr)
