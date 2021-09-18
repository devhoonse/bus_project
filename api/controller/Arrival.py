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
        }
        """

        timestamp = datetime.datetime.now()

        # todo: 반환 데이터 구조 정의하기
        res = jsonify({
            'success': True,
            'requested': request.args,
            'timestamp': timestamp,
        })

        return res
