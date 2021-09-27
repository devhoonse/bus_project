# -*- coding: utf-8 -*-

import re
import os
import datetime

import pandas as pd
from flask import current_app


# project_path = "/home/gomata/src/api/static"


def diff_time(start_time, stop_time):
    date = datetime.date(1, 1, 1)
    datetime1 = datetime.datetime.combine(date, stop_time)
    datetime2 = datetime.datetime.combine(date, start_time)
    time_elapsed = datetime1 - datetime2
    return time_elapsed


def arrival_time_history(bus_id: str = '241312015', bus_station_id: str = '218001146', date: str = '20210802'):
    now_time = datetime.datetime.now().time()  # datetime.datetime.strptime(now, '%Y-%m-%d %H:%M:%S').time()
    read_path = os.path.join(current_app.project_path, 'data', bus_id, 'at')    # f"{project_path}/data/{bus_id}/at"
    read_file_path = os.path.join(read_path, f'{date}.txt')         #  f"{read_path}/{date}.txt"
    df = pd.read_csv(read_file_path)
    df = df.sort_values('arrivalTime')
    select1 = df.apply(lambda x: datetime.datetime.strptime(x['arrivalTime'], '%Y-%m-%d %H:%M:%S').time() > now_time, axis=1)
    select2 = df.apply(lambda x: str(x['stationId']) == bus_station_id, axis=1)
    df_2 = df[select1 & select2].head(n=2)
    res = df_2["arrivalTime"].apply(lambda x: (diff_time(now_time, datetime.datetime.strptime(x, '%Y-%m-%d %H:%M:%S').time()).seconds//60))
    res_list = res.to_list()
    return res_list


def run_time_history(bus_id: str = '241312015', bus_station_id: str = '218001146', subway_station_name: str = '행신역'):
    for i in range(5):
        operand1 = arrival_time_history(bus_id, find_sub_stationId(bus_id, bus_station_id, subway_station_name))[i]
        operand2 = arrival_time_history(bus_id, bus_station_id)[0]
        if (operand1 - operand2 > 0): 
            return operand1 - operand2


def arrival_sub_time(subway_station_name: str, est_arrival_time: datetime.datetime):

    est_arrival_time = est_arrival_time.time()
    select1 = current_app.subway_schedule["upDownTypeCode"].apply(lambda x: x == "U")
    select2 = current_app.subway_schedule["subwayStationNm"].apply(lambda x: x == subway_station_name)
    select3 = current_app.subway_schedule["depTime"].apply(lambda x: est_arrival_time < datetime.datetime.strptime(x, '%H:%M:%S').time())
    res = {"upward": current_app.subway_schedule[select1 & select2 & select3].head(n=2).apply(lambda x: str(x["depTime"])[:5] + "(" + x["endSubwayStationNm"] + ")", axis=1).to_list(),
           "downward": current_app.subway_schedule[-select1 & select2 & select3].head(n=2).apply(lambda x: str(x["depTime"])[:5] + "(" + x["endSubwayStationNm"] + ")", axis=1).to_list()}
    return res


def find_sub_stationId(bus_id: str, bus_station_id: str, subway_station_name: str):

    route_info_path = os.path.join(current_app.project_path, 'data', bus_id, 'info', 'station_info.txt')    # f"{project_path}/data/{route}/info/station_info.txt"
    route_info = pd.read_csv(route_info_path)

    station_ord = route_info[route_info['stationId'].apply(lambda x : str(x) == bus_station_id)]["ord"]
    select1 = route_info["ord"].apply(lambda x: x > int(station_ord))
    select2 = route_info["stationNm"].apply(lambda x: True if re.search(subway_station_name, x) else False )
    subway_station_id = str(route_info[select1 & select2]["stationId"].to_list()[0])
    return subway_station_id


def find_station_list(bus_id: str, subway_station_name: str):
    route_info_path = os.path.join(current_app.project_path, 'data', bus_id, 'info', 'station_info.txt')    # f"{project_path}/data/{bus_id}/info/station_info.txt"
    route_info = pd.read_csv(route_info_path)
    select1 = route_info["from"].apply(lambda x: True if re.search(x, subway_station_name) else False)
    station_ids = route_info[select1]["stationId"].to_list()
    station_names = route_info[select1]["stationNm"].to_list()
    n = len(station_ids)

    res = []
    for i in range(n):
        item = {
            'value': str(station_ids[i]),
            'label': station_names[i],
        }
        res.append(item)
    return res
