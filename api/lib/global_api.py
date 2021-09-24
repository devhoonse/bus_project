# -*- coding: utf-8 -*-
import datetime
import ssl
import http
import json



def get_arrival_info(routeId: str, stationId: str) -> dict:
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    conn = http.client.HTTPSConnection("www.gbis.go.kr", context=ssl._create_unverified_context())

    payload = f"cmd=searchBusStationJson&" \
        f"stationId={stationId}"

    headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        'charset': "UTF-8"
    }

    conn.request("POST", "/gbis2014/schBusAPI.action", payload, headers)

    res = conn.getresponse()
    data = res.read()
    res = dict(json.loads(data.decode("utf-8")))
    res_bus_list = res['result']['busArrivalInfo']