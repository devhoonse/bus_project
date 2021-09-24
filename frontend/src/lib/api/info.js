import qs from 'qs';

import client from "./client";


export const getAvailableSubwayStations = ({ latitude, longitude }) => {

    const queryString = qs.stringify({
      latitude,
      longitude,
    });
    return client.get(`/api/info/nearSubwayStations?${queryString}`);
};


export const getAvailableBusStations = ({ bus_id, subway_station_id }) => {
    const queryString = qs.stringify({
      bus_id,
      subway_station_id,
    });
    return client.get(`/api/info/availableBusStations?${queryString}`);
};
