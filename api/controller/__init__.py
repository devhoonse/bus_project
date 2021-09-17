# -*- coding: utf-8 -*-

# third-parties
from flask_restx import Api

# user-defined Modules
from controller import Arrival
from controller import Setting
from controller import Timetable


def apply_to(api: Api) -> None:
    """
    각 컨트롤러를 위한 서브 라우터를 등록합니다.
    :param api:
    :return: void
    """

    # 각 서브 라우트를 등록합니다.
    api.add_namespace(Arrival.namespace, '/arrival')
    api.add_namespace(Setting.namespace, '/setting')
    api.add_namespace(Timetable.namespace, '/timetable')
