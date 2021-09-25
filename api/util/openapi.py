# -*- coding: utf-8 -*-

import ssl
import json
import datetime
import http.client

import pandas as pd


def get_arrival_info(bus_id, bus_station_id) -> dict:
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    conn = http.client.HTTPSConnection("www.gbis.go.kr", context=ssl._create_unverified_context())

    payload = f"cmd=searchBusStationJson&" \
              f"stationId={bus_station_id}"

    headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        'charset': "UTF-8"
    }

    conn.request("POST", "/gbis2014/schBusAPI.action", payload, headers)

    res = conn.getresponse()
    data = res.read()
    res = dict(json.loads(data.decode("utf-8")))
    res_bus_list = res['result']['busArrivalInfo']

    output_df = pd.DataFrame(
        columns=['stationId', 'routeId', 'predictTime1', 'predictTime2', 'plateNo1', 'plateNo2', 'queryTime'])

    for i in res_bus_list:
        res_bus = pd.DataFrame({"stationId": [i['stationId']], "routeId": [i['routeId']], "plateNo1": [i['plateNo1']],
                                "plateNo2": [i['plateNo2']], "predictTime1": [i['predictTime1']],
                                "predictTime2": [i['predictTime2']], "queryTime": [date_time]})
        if res_bus["routeId"].apply(lambda x: x == bus_id).to_list()[0]:
            output_df = output_df.append(res_bus)

    output_list = []
    if output_df.shape[0] > 0:
        output_list.append(dict(output_df.iloc[0]))
    return output_list
