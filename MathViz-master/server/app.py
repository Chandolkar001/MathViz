from flask import Flask, jsonify, url_for
from datetime import datetime

from resources.simpsons import simpsons
from resources.simpsons38 import simpsons38
from resources.eulers import eulers
from resources.newtonForward import newtonForward
from resources.trapezoidal import trapezoidal
from resources.ModifiedEuler import modifiedEulers
from resources.NewtonBackward import newtonBackward
from resources.rungeKutta import rungeKutta


app = Flask(__name__)
app.register_blueprint(simpsons, url_prefix="/api/simpsons")
app.register_blueprint(simpsons38, url_prefix="/api/simpsons38")
app.register_blueprint(eulers, url_prefix="/api/eulers")
app.register_blueprint(newtonForward, url_prefix="/api/newtonForward")
app.register_blueprint(newtonBackward, url_prefix="/api/newtonBackward")
app.register_blueprint(trapezoidal, url_prefix="/api/trapezoidal")
app.register_blueprint(modifiedEulers, url_prefix="/api/modifiedEulers")
app.register_blueprint(rungeKutta, url_prefix="/api/rungeKutta")
# app.config['SECRET_KEY'] = '0bf4e4cb188288bd1303d6d6'

@app.route("/test", methods=["GET"])
def data():
    return jsonify(type="Test", now=datetime.now())


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


@app.route("/site-map")
def site_map():
    links = []
    for rule in app.url_map.iter_rules():
        if has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))

    return jsonify(links=links, now=datetime.now())


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
