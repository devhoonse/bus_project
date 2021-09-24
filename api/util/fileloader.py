# -*- coding: utf-8 -*-

import re
import os
import datetime

import pandas as pd


project_path = "/home/gomata/src/api/static"



def loadStationInfo(txt_path: str):
    station_info = pd.read_csv(txt_path, encoding='cp949')


def diff_time(start_time, stop_time):
    date = datetime.date(1, 1, 1)
    datetime1 = datetime.datetime.combine(date, stop_time)
    datetime2 = datetime.datetime.combine(date, start_time)
    time_elapsed = datetime1 - datetime2
    return time_elapsed


def arrival_time_history(bus_id: str = '023', bus_station_id: str = '218001146', date: str = '20210802'):
    now_time = datetime.datetime.now().time()  # datetime.datetime.strptime(now, '%Y-%m-%d %H:%M:%S').time()
    read_path = os.path.join(project_path, 'data', bus_id, 'at')    # f"{project_path}/data/{bus_id}/at"
    read_file_path = os.path.join(read_path, f'{date}.txt')         #  f"{read_path}/{date}.txt"
    df = pd.read_csv(read_file_path)
    df = df.sort_values('arrivalTime')
    select1 = df.apply(lambda x: datetime.datetime.strptime(x['arrivalTime'], '%Y-%m-%d %H:%M:%S').time() > now_time, axis=1)
    select2 = df.apply(lambda x: str(x['stationId']) == bus_station_id, axis=1)
    df_2 = df[select1 & select2].head(n=2)
    res = df_2["arrivalTime"].apply(lambda x: (diff_time(now_time, datetime.datetime.strptime(x, '%Y-%m-%d %H:%M:%S').time()).seconds//60) % 60)
    res_list = res.to_list()
    return res_list


def find_station_list(bus_id, subway_station_id):
    route_info_path = os.path.join(project_path, 'data', bus_id, 'info', 'station_info.txt')    # f"{project_path}/data/{bus_id}/info/station_info.txt"
    route_info = pd.read_csv(route_info_path)
    select1 = route_info["from"].apply(lambda x: True if re.search(x, subway_station_id) else False)
    stationId_list = route_info[select1]["stationId"].to_list()
    stationNm_list = route_info[select1]["stationNm"].to_list()
    n = len(stationId_list)

    res = []
    for i in range(n):
        item = {
            'value': str(stationId_list[i]),
            'label': stationNm_list[i],
        }
        res.append(item)
    return res
