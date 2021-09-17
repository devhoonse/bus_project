# -*- coding: utf-8 -*-

# third-parties
from flask import Flask
from flask_restx import Api

# user-defined Modules
import controller


def create_app():
    app = Flask(__name__, static_folder='./static/')

    api = Api(app,
              version='0.0.0',
              title='GOMATA API',
              description='',
              doc='/doc')
    controller.apply_to(api)

    return app
