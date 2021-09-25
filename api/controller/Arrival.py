# -*- coding: utf-8 -*-

# built-ins
import datetime

# third-parties
from flask import request, jsonify
from flask_restx import Resource, Namespace

# user-defined Modules
from controller.params import busArrivalQueryParams
from util.fileloader import arrival_time_history, run_time_history, arrival_sub_time
from util.openapi import get_arrival_info


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
                    realtimes: 경기버스 API 로부터 받은 현재 마을버스 정류장까지 도착 예정 시간
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

        # todo: date 파라미터로 기준정보 일자 전달
        try:
            error_location = 'expectations'
            expectations = arrival_time_history(
                bus_id=request.args.get('bus_id'),
                bus_station_id=request.args.get('bus_station_id'),
            )

            error_location = 'realtimes'
            realtimes = get_arrival_info(
                bus_id=request.args.get('bus_id'),
                bus_station_id=request.args.get('bus_station_id'),
            )
            realtime = realtimes[0]['predictTime1'].strip()

            error_location = 'duration'
            duration = run_time_history(
                bus_id=request.args.get('bus_id'),
                bus_station_id=request.args.get('bus_station_id'),
                subway_station_name=request.args.get('subway_station_id'),  # todo: 실제 id 로 교체작업 필요
            )

            error_location = 'subway'

            est_run_time: int
            if realtime:
                est_run_time = int(realtime)
            else:
                est_run_time = expectations[0]

            total_duration = duration + est_run_time + 2 + 0
            est_arrival_time = datetime.datetime.now() + datetime.timedelta(minutes=total_duration)

            subway = arrival_sub_time(
                subway_station_name=request.args.get('subway_station_id'),
                est_arrival_time=est_arrival_time,
            )

        except (Exception, BaseException) as e:
            return jsonify({
                'success': False,
                'params': request.args,
                'timestamp': timestamp,
                'data': {
                    'list': [],
                    'error_location': error_location,
                    'error': str(e),
                },
            })

        res = jsonify({
            'success': True,
            'params': request.args,
            'timestamp': timestamp,
            'data': {
                'bus': {
                    'expectations': expectations,
                    'realtimes': realtimes,
                    'realtime': realtime,
                    'duration': duration,
                },
                'subway': {
                    'upward': subway['upward'],
                    'downward': subway['downward'],
                },
                'total_duration': total_duration,
                'estimated_arrival_time': est_arrival_time,
                'estimated_run_time': est_run_time
            },
        })

        return res
