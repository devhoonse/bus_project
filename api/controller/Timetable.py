# -*- coding: utf-8 -*-

# built-ins
import os
import base64
import datetime

# third-parties
from flask import request, jsonify
from flask_restx import Resource, Namespace

# user-defined Modules
from controller.params import busArrivalQueryParams


namespace = Namespace(name='/timetable', description="버스 도착 시간표 API")


@namespace.route('')
class Timetable(Resource):

    @namespace.doc(params=busArrivalQueryParams)
    def get(self):
        """
        버스 도착시간 분포 시간표를 제공합니다.
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 구성
            timestamp: timestamp    // 요청 처리 완료 시간
        }
        """

        timestamp = datetime.datetime.now()

        timetable_url = f'{request.url_root}resource/data_collection/data/' \
                        f'{request.args["bus_id"]}/schedule/' \
                        f'{request.args["bus_station_id"]}.png'
        image_path = os.path.join(
            'static', 'data_collection', 'data',
            request.args['bus_id'], 'schedule',
            f'{request.args["bus_station_id"]}.png'
        )
        with open(image_path, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read())

        # todo: 반환 데이터 구조 정의하기
        res = jsonify({
            'success': True,
            'params': request.args,
            'timestamp': timestamp,
            'timetable': {
                'byte_string': encoded_image.decode('ascii'),
                'url': timetable_url,
            },
        })

        return res
