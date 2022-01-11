import math, sys
from flask import Blueprint, request, logging, current_app, Response, jsonify
from flask.helpers import make_response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
#import plotly.graph_objects as go
import io
import sympy as sp
import numpy as np

simpsons = Blueprint('simpsons', __name__) 

@simpsons.route('/run', methods =['POST'])
def post():
    #Code to accept input from the user.
    input = request.json
    partitions = input['partitions'] if 'partitions' in input else None
    fx = input['fx']
    fx = sp.sympify(fx)
    mode = input['mode']
    x_l = sp.nsimplify(input['x_l'])
    x_u = sp.nsimplify(input['x_u'])
    if mode == 'degrees':
        x_l = x_l * math.pi / 180
        x_u = x_u * math.pi / 180
    x_l=float(x_l)
    x_u=float(x_u)
    current_app.logger.info(f'fx = {fx}, mode = {mode}, x_l = {x_l} x_u = {x_u} partitions = {partitions}')

    #Creating initial figure of required size.
    fig = Figure(figsize=(10, 10), dpi=80, facecolor='w', edgecolor='k')
    ax = fig.subplots()
    X0= None
    Y0= None
    Simson = None

    try:
        ax.set_title(f'Simpsons rule: plot of f = {fx}' )
      
        ax.set_xlabel('x')
        ax.set_ylabel('y')

        step_size =  (x_u - x_l + 1) / 1000.0

        x_plot = np.arange(x_l, x_u + step_size, step_size)
        # current_app.logger.info(f'{x_plot}')
        y_plot=[]
        x = sp.var('x')
        for i in range(len(x_plot)):
            y_plot.append(sp.limit(fx, x, x_plot[i]))
        
        # current_app.logger.info(f'{y_plot}')

        ax.plot(x_plot,y_plot,'r')     
        ax.axvline(x=0, color='b')
        ax.axhline(y=0, color='b')
        ax.vlines(x=x_l, ymin=0, ymax = float(sp.limit(fx, x, x_l)))
        ax.vlines(x=x_u, ymin=0, ymax = float(sp.limit(fx, x, x_u)))

        # PART : 2
        if partitions:
            f = fx
            n = partitions
            if (n%2 == 0):
                h = (x_u-x_l)/n
                X=[]
                Y=[]
                x_temp=x_l
                for i in range(n+1):
                    X.append(x_temp)
                    #Y.append(f.subs(x,x_temp))
                    Y.append(float(sp.limit(f,x,x_temp)))
                    x_temp=x_temp+h
                i = 0
                while (i < n):
                    k = (int(X[i+2]-X[i])+1)*10
                    x_s=np.linspace(X[i],X[i+2], k)
                    y_s=[float (Y[i]+(((x_s[j]-X[i])/h)*(Y[i+1]-Y[i]))+(((x_s[j]*x_s[j] - x_s[j]*(X[i]+X[i+1])+X[i]*X[i+1])/(2*h*h))*(Y[i+2]-2*Y[i+1]+Y[i]))) for j in range(k)]
                    ax.vlines(x=X[i], ymin=0, ymax=Y[i])
                    ax.vlines(x=X[i+1],ymin=0, ymax=Y[i+1],color='grey',linestyles='--')
                    #plt.vlines(x=X[i+1],ymin=0, ymax=Y[i+1],color='grey',linestyles='--')
                    ax.plot(x_s, y_s)
                    i=i+2

                ax.vlines(x=X[n],ymin=0, ymax=Y[n])
            else:
                pass
                        
    except Exception as e:
        current_app.logger.exception('Something went wrong')
        ax.set_title('Error: Something went wrong')

    with io.BytesIO() as pseudo_file:
        FigureCanvas(fig).print_png(pseudo_file)
        content = pseudo_file.getvalue()
        return Response(content, mimetype='image/png')

@simpsons.route('/runtable', methods =['POST'])
def post1():
    input = request.json
    partitions = input['partitions'] if 'partitions' in input else None
    fx = input['fx']
    fx = sp.sympify(fx)
    mode = input['mode']
    x_l = sp.nsimplify(input['x_l'])
    x_u = sp.nsimplify(input['x_u'])
    if mode == 'degrees':
        x_l = x_l * math.pi / 180
        x_u = x_u * math.pi / 180
    x_l=float(x_l)
    x_u=float(x_u)
    current_app.logger.info(f'fx = {fx}, mode = {mode}, x_l = {x_l} x_u = {x_u} partitions = {partitions}')

    # fig = Figure(figsize=(10, 10), dpi=80, facecolor='w', edgecolor='k')
    # ax = fig.subplots()
    X0= None
    Y0= None
    Simson = None
    I=None

    try:
        # ax.set_title(f'Simpsons: plot of f = {fx}' )
      
        # ax.set_xlabel('x')
        # ax.set_ylabel('y')

        # step_size = 0.1 # (x_u - x_l + 1) / 1000.0

        # x_plot = np.arange(x_l, x_u + step_size, step_size)
        # # current_app.logger.info(f'{x_plot}')
        # y_plot=[]
        x = sp.var('x')
        # for i in range(len(x_plot)):
        #     y_plot.append(sp.limit(fx, x, x_plot[i]))
        
        # # current_app.logger.info(f'{y_plot}')

        # ax.plot(x_plot,y_plot,'r')     
        # ax.axvline(x=0, color='b')
        # ax.axhline(y=0, color='b')
        # ax.vlines(x=x_l, ymin=0, ymax = float(sp.limit(fx, x, x_l)))
        # ax.vlines(x=x_u, ymin=0, ymax = float(sp.limit(fx, x, x_u)))

        # PART : 2
        if partitions:
            f = fx
            n = partitions
            h = (x_u-x_l)/n
            X=[]
            Y=[]
            x_temp=x_l
            for i in range(n+1):
                X.append(x_temp)
                #Y.append(f.subs(x,x_temp))
                Y.append(float(sp.limit(f,x,x_temp)))
                x_temp=x_temp+h
            i = 0
            # while (i < n):
            #     k = (int(X[i+2]-X[i])+1)*10
            #     x_s=np.linspace(X[i],X[i+2], k)
            #     y_s=[float (Y[i]+(((x_s[j]-X[i])/h)(Y[i+1]-Y[i]))+(((x_s[j]*x_s[j] - x_s[j](X[i]+X[i+1])+X[i]X[i+1])/(2*h*h))(Y[i+2]-2*Y[i+1]+Y[i]))) for j in range(k)]
            #     ax.vlines(x=X[i], ymin=0, ymax=Y[i])
            #     ax.vlines(x=X[i+1],ymin=0, ymax=Y[i+1],color='grey',linestyles='--')
            #     #plt.vlines(x=X[i+1],ymin=0, ymax=Y[i+1],color='grey',linestyles='--')
            #     ax.plot(x_s, y_s)
            #     i=i+2

            # ax.vlines(x=X[n],ymin=0, ymax=Y[n])
            X0=[]
            Y0=[]
            for i in range(len(X)):
                try:
                    X0.append(sp.nsimplify(X[i]).limit_denominator())
                
                except:
                    try:
                        X0.append(sp.nsimplify(X[i]))
                    except:    
                        X0.append(float(X[i]))
                print(sp.nsimplify(X[i]))

                Y0.append(float(Y[i]))

            for j in range(0, len(X0)):
                X0[j] = str(X0[j]).replace("pi", "𝛑")
                X0[j] = str(X0[j]).replace("*", "")
                

            Simson=Y[0]+Y[n]
            sum1 = r'y_0 + y_{'+sp.latex(n)+r'}'
            sum2 = r''
            sum3 = r''
            for i in range(1,n):
                if (i%2==0):
                    Simson=Simson+2*Y[i]
                    sum2 = sum2 + r'y_{'+ sp.latex(i) +r'}'
                    if (i != n-2):
                        sum2 = sum2 + r'+'
                else:
                    Simson=Simson+4*Y[i]
                    sum3 = sum3 + r'y_{'+ sp.latex(i) +r'}'
                    if (i != n-1):
                        sum3 = sum3 + r'+'
            sum = r'\frac{h}{3} \left( \left('+sum1+r'\right) + 2 \left( '+sum2+r'\right) + 4 \left('+sum3+r'\right) \right)'  
            Simson=float((h/3)*Simson)
            I = sp.integrate(f, (x, x_l, x_u))  
            I = float(I)
         
    except Exception as e:
        current_app.logger.exception('Something went wrong')
        #ax.set_title('Error: Something went wrong')

    lst = []
    for i in range(0, len(X0)):
        lst.append({"key":i, "one": X0[i], "two":Y0[i]})

    dataStr = {
        "a": lst,
        "area1": Simson,
        "area2": I
    }

    print(X)
    return jsonify(dataStr)