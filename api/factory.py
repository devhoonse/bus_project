# -*- coding: utf-8 -*-

# third-parties
from flask import Flask, Blueprint
from flask_restx import Api

# user-defined Modules
import controller


def create_app(url_prefix: str = 'api'):

    app = Flask(__name__, static_folder='./static/')

    blueprint = Blueprint(url_prefix, __name__, url_prefix=f"/{url_prefix}")
    api = Api(blueprint,
              version='0.0.0',
              title='GOMATA API',
              contact='devhoonse@gmail.com',
              description='고양시 마을버스 타요',
              doc='/doc')
    controller.apply_to(api)
    app.register_blueprint(blueprint)

    # outer_app = DispatcherMiddleware(Flask('dummy_app'), {
    #     app.config['APPLICATION_ROOT']: app
    # })

    return app
