busArrivalQueryParams = {
    'bus_station_id': {'name': 'bus_station_id', 'description': '버스 정류장 ID', 'in': 'query', 'type': 'str'},
    'bus_id': {'name': 'bus_id', 'description': '버스 ID', 'in': 'query', 'type': 'str'},
    'subway_station_id': {'name': 'subway_station_id', 'description': '지하철역 ID', 'in': 'query', 'type': 'str'},
}

nearSubwayStationsQueryParams = {
    'longitude': {'name': 'longitude', 'description': '현위치 경도', 'in': 'query', 'type': 'float'},
    'latitude': {'name': 'latitude', 'description': '현위치 위도', 'in': 'query', 'type': 'float'},
}

availableBusStationsQueryParams = {
    'bus_id': {'name': 'bus_id', 'description': '버스 ID', 'in': 'query', 'type': 'str'},
    'subway_station_id': {'name': 'subway_station_id', 'description': '지하철역 ID', 'in': 'query', 'type': 'str'},
}

availableBusIdsQueryParams = {
    'bus_station_id': {'name': 'bus_station_id', 'description': '버스 정류장 ID', 'in': 'query', 'type': 'str'},
    'subway_station_id': {'name': 'subway_station_id', 'description': '지하철역 ID', 'in': 'query', 'type': 'str'},
}

settingQueryParams = {
    'user_id': {'name': 'user_id', 'description': '사용자 ID', 'in': 'query', 'type': 'str'},
}
