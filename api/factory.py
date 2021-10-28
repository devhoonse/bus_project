# -*- coding: utf-8 -*-

# built-ins
import os

# third-parties
import pandas as pd
from flask import Flask, Blueprint, current_app
from flask_restx import Api

# user-defined Modules
import controller


def configure_app_context(app):
    """
    서비스 내 모든 스레드에서 참조될 공용 데이터들을 등록합니다.
    :param app:
    :return:
    """
    with app.app_context():

        # 프로젝트 경로 정보 등록 (도커 컨테이너 내 디렉토리 위치 -> 호스트 인스턴스의 data_collect 디렉토리에 연결됨)
        # current_app.project_path = "static/data_collection"
        current_app.project_path = "/home/gomata/src/api/static/data_collection"

        # 지하철역 스케줄 데이터 등록
        current_app.subway_schedule = pd.read_csv(
            os.path.join(current_app.project_path, 'ref', 'sub_schedule.txt'),
            sep='\t'
        )
        current_app.subway_schedule = current_app.subway_schedule.sort_values("depTime")


def create_app(url_prefix: str = 'api'):

    # Flask 어플리케이션 생성
    app = Flask(__name__,
                static_url_path='/resource',
                static_folder='./static/')

    # 세션 관리를 위한 키 할당
    with open('app.key', 'r') as app_key:
        app.secret_key = app_key.read()

    # 어플리케이션 컨텍스트 설정
    configure_app_context(app)

    # API 컨트롤러 등록
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
