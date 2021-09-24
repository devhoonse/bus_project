# -*- coding: utf-8 -*-

# third-parties
from flask import Flask, Blueprint, current_app
from flask_restx import Api

# user-defined Modules
import controller
from util.fileloader import loadStationInfo


def configure_app_context(app):
    with app.app_context():
        current_app.stationInfo = loadStationInfo('')


def create_app(url_prefix: str = 'api'):

    app = Flask(__name__, static_folder='./static/')
    with open('app.key', 'r') as app_key:
        app.secret_key = app_key.read()  # 세션 관리를 위한 키 할당

    blueprint = Blueprint(url_prefix, __name__, url_prefix=f"/{url_prefix}")
    api = Api(blueprint,
              version='0.0.0',
              title='GOMATA API',
              contact='devhoonse@gmail.com',
              description='고양시 마을버스 타요',
              doc='/doc')
    controller.apply_to(api)
    app.register_blueprint(blueprint)

    return app
