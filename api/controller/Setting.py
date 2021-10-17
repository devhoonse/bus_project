# -*- coding: utf-8 -*-

# built-ins
import datetime

# third-parties
from flask import request, jsonify, session
from flask_restx import Resource, Namespace, fields

# user-defined Modules
from controller.params import settingQueryParams
from util.fileloader import find_station_list


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
            data: {                 // 유저 개인 설정 구성
                bus_station_id: string,     // 버스 정류장
                bus_id: string,             // 버스 노선
                subway_station_id: string,  // 환승 정류장
            }
        }
        """

        timestamp = datetime.datetime.now()
        success = True

        try:

            bus_id = session.get('setting', dict()).get('bus_id', '241312015')
            bus_station_id = session.get('setting', dict()).get('bus_station_id', '218000542')
            subway_station_id = session.get('setting', dict()).get('subway_station_id', '행신역')

            subway_stations = [
                {'label': '행신역', 'value': '행신역'},  #
                {'label': '화정역', 'value': '화정역'},
            ]
            bus_stations = list(filter(
                lambda obj: obj['value'] == bus_station_id,
                find_station_list(
                    bus_id=bus_id,
                    subway_station_name=subway_station_id,  # todo: 실제 지하철역 ID 로 교체 작업 필요
                )
            ))

            bus_station_nm = bus_stations[0]['label'] if bus_stations else 'ERROR'
            subway_station_nm = list(filter(
                lambda obj: obj['value'] == subway_station_id,
                subway_stations
            ))[0]['label']

            data = {
                'bus_station_id': bus_station_id,
                'bus_station_nm': bus_station_nm,
                'bus_id': bus_id,
                'bus_nm': '023',
                'subway_station_id': subway_station_id,
                'subway_station_nm': subway_station_nm,
            }

        except (Exception, BaseException) as error:
            success = False
            data = {
                'error': str(error)
            }

        finally:
            res = jsonify({
                'success': success,
                'params': request.args,
                'timestamp': timestamp,
                'data': data,
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
        유저 개인 설정 구성을 서버 세션에 저장합니다. (향후 DB 저장 방식으로 변경 예정)
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 구성
            timestamp: timestamp    // 요청 처리 완료 시간
            data: {                 // 유저 개인 설정 구성
                bus_station_id: string,     // 버스 정류장
                bus_id: string,             // 버스 노선
                subway_station_id: string,  // 환승 정류장
            }
        }
        """

        timestamp = datetime.datetime.now()
        success = True

        try:

            bus_id = request.json.get('bus_id')
            bus_station_id = request.json.get('bus_station_id')
            subway_station_id = request.json.get('subway_station_id')

            subway_stations = [
                {'label': '행신역', 'value': '행신역'},  #
                {'label': '화정역', 'value': '화정역'},
            ]
            bus_stations = find_station_list(
                bus_id=bus_id,
                subway_station_name=subway_station_id,  # todo: 실제 지하철역 ID 로 교체 작업 필요
            )

            bus_station_nm = bus_stations[0]['label'] if bus_stations else 'ERROR'
            subway_station_nm = list(filter(
                lambda obj: obj['value'] == subway_station_id,
                subway_stations
            ))[0]['label']

            session['setting'] = request.json

            data = {
                'bus_station_id': bus_station_id,
                'bus_station_nm': bus_station_nm,
                'bus_id': bus_id,
                'bus_nm': '023',
                'subway_station_id': subway_station_id,
                'subway_station_nm': subway_station_nm,
                **session.get('setting', dict())
            }

        except (Exception, BaseException) as error:
            success = False
            data = {
                'error': str(error)
            }

        finally:
            res = jsonify({
                'success': success,
                'params': request.json,
                'timestamp': timestamp,
                'data': data,
            })

            return res
