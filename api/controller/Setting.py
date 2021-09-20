# -*- coding: utf-8 -*-

# built-ins
import datetime

# third-parties
from flask import request, jsonify, session
from flask_restx import Resource, Namespace, fields

# user-defined Modules
from controller.params import settingQueryParams


namespace = Namespace(name='/setting', description="유저 개인 설정 API")


@namespace.route('')
class Setting(Resource):

    @namespace.doc(params=settingQueryParams)
    def get(self):
        """
        유저 개인 설정 구성을 제공합니다.
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 구성
            timestamp: timestamp    // 요청 처리 완료 시간
        }
        """

        timestamp = datetime.datetime.now()

        # todo: 반환 데이터 구조 정의하기
        res = jsonify({
            'success': True,
            'params': request.args,
            'timestamp': timestamp,
            'data': {
                'bus_station_id': '행신초등학교',
                'bus_id': '마을23',
                'subway_station_id': '행신역',
                **session.get('setting', dict())
            },
        })

        return res

    @namespace.expect(namespace.model(
        'SettingModel',
        {
            'bus_station_id': fields.String(description='버스 정류장 ID', required=True),
            'bus_id': fields.String(description='버스 ID', required=True),
            'subway_station_id': fields.String(description='지하철역 ID', required=True),
        }
    ))
    def post(self):
        """
        유저 개인 설정 구성을 제공합니다.
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 설정
            timestamp: timestamp    // 요청 처리 완료 시간
        }
        """

        timestamp = datetime.datetime.now()

        session['setting'] = request.json

        # todo: 반환 데이터 구조 정의하기
        res = jsonify({
            'success': True,
            'params': request.json,
            'timestamp': timestamp,
            'data': session['setting'],
        })

        return res
