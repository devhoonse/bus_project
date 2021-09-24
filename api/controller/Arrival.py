# -*- coding: utf-8 -*-

# built-ins
import datetime

# third-parties
from flask import request, jsonify
from flask_restx import Resource, Namespace

# user-defined Modules
from controller.params import busArrivalQueryParams


namespace = Namespace(name='/arrival', description="버스 도착 정보 API")


@namespace.route('')
class Arrival(Resource):

    @namespace.doc(params=busArrivalQueryParams)
    def get(self):
        """
        특정 정류장에서 특정 버스에 대한 도착 정보를 제공합니다.
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 구성
            timestamp: timestamp    // 요청 처리 완료 시간
            data: {
                bus: {
                    expectation: 예측치에 의한 마을버스 정류장까지 도착 예정 시간
                    realtime: 경기버스 API 로부터 받은 현재 마을버스 정류장까지 도착 예정 시간
                    duration: 현재 마을버스 정류장에서 환승 전철역까지 걸리는 소요시간
                },
                subway: {
                    upward: 곧 도착 예정인 상행선 도착시간
                    downward: 곧 도착 예정인 하행선 도착시간
                }
            }
        }
        """

        timestamp = datetime.datetime.now()

        res = jsonify({
            'success': True,
            'params': request.args,
            'timestamp': timestamp,
            'data': {
                'bus': {
                    'expectation': 8,
                    'realtime': 6,
                    'duration': 9,
                },
                'subway': {
                    'upward': datetime.datetime.now() + datetime.timedelta(minutes=5),
                    'downward': datetime.datetime.now() + datetime.timedelta(minutes=10),
                },
            },
        })

        return res
