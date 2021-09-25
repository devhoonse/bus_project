# -*- coding: utf-8 -*-

# built-ins
import datetime

# third-parties
from flask import request, jsonify, session, current_app
from flask_restx import Resource, Namespace, fields

# user-defined Modules
from util.fileloader import find_station_list
from controller.params import \
    nearSubwayStationsQueryParams, \
    availableBusStationsQueryParams, \
    availableBusIdsQueryParams


namespace = Namespace(name='/info', description="사용자 설정에 따른 주변 정보")


@namespace.route('/nearSubwayStations')
class NearSubwayStations(Resource):

    @namespace.doc(params=nearSubwayStationsQueryParams)
    def get(self):
        """
        현재 설정된 환승전철역, 버스노선 구성에 선택 가능한 버스 정류장 목록을 제공합니다.
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 구성
            timestamp: timestamp    // 요청 처리 완료 시간
            data: {                 // 유저 개인 설정 구성
                list: [
                    {
                        bus_station_id: string,     // 버스 정류장 ID
                        bus_station_name: string,   // 버스 정류장 이름
                    },
                    ...
                ]
            }
        }
        """

        timestamp = datetime.datetime.now()

        # todo: 반환 데이터 실데이터로 교체하기
        res = jsonify({
            'success': True,
            'params': request.args,
            'timestamp': timestamp,
            'data': {
                'list': [
                    {'label': '행신역', 'value': '행신역'},   #
                    {'label': '화정역', 'value': '화정역'},
                ],
            },
        })

        return res


@namespace.route('/availableBusStations')
class AvailableBusStations(Resource):

    @namespace.doc(params=availableBusStationsQueryParams)
    def get(self):
        """
        현재 설정된 환승전철역, 버스노선 구성에 선택 가능한 버스 정류장 목록을 제공합니다.
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 구성
            timestamp: timestamp    // 요청 처리 완료 시간
            data: {                 // 유저 개인 설정 구성
                list: [
                    {
                        bus_station_id: string,     // 버스 정류장 ID
                        bus_station_name: string,   // 버스 정류장 이름
                    },
                    ...
                ]
            }
        }
        """

        timestamp = datetime.datetime.now()

        try:
            stations = find_station_list(
                bus_id=request.args.get('bus_id'),
                subway_station_name=request.args.get('subway_station_id'),  # todo: 실제 지하철역 ID 로 교체 작업 필요
            )
        except (Exception, BaseException) as e:
            return jsonify({
                'success': False,
                'params': request.args,
                'timestamp': timestamp,
                'data': {
                    'list': [],
                    'error': str(e),
                },
            })

        res = jsonify({
            'success': True,
            'params': request.args,
            'timestamp': timestamp,
            'data': {
                'list': stations,
            },
        })

        return res


@namespace.route('/availableBusIds')
class AvailableBusIds(Resource):

    @namespace.doc(params=availableBusIdsQueryParams)
    def get(self):
        """
        (미사용) 현재 설정된 환승전철역, 버스 정류장 구성에 선택 가능한 버스 목록을 제공합니다.
        :return: {
            success: boolean,       // 요청 처리 성공 여부
            requested: json,        // 요청받은 매개변수 구성
            timestamp: timestamp    // 요청 처리 완료 시간
            data: {                 // 유저 개인 설정 구성
                list: [
                    {
                        bus_id: string,     // 버스 ID
                        bus_name: string,   // 버스 이름
                    },
                    ...
                ]
            }
        }
        """

        timestamp = datetime.datetime.now()

        # todo: 반환 데이터 구조 정의하기
        res = jsonify({
            'success': True,
            'params': request.args,
            'timestamp': timestamp,
            'data': {
                'list': [

                ],
            },
        })

        return res
