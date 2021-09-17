# -*- coding: utf-8 -*-

# built-ins
import datetime

# third-parties
from flask import request, jsonify
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
            requested: json,        // 요청받은 매개변수 설정
            timestamp: timestamp    // 요청 처리 완료 시간
        }
        """

        timestamp = datetime.datetime.now()

        # todo: 반환 데이터 구조 정의하기
        res = jsonify({
            'success': 'true',
            'params': request.args,
            'timestamp': timestamp,
        })

        return res

    @namespace.expect(namespace.model(
        'SettingModel',
        {
            'user_id': fields.String(description='사용자 ID', required=True),
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

        # todo: 반환 데이터 구조 정의하기
        res = jsonify({
            'success': 'true',
            'params': request.json,
            'timestamp': timestamp,
        })

        return res
