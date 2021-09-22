import qs from 'qs';

import client from "./client";


export const getTimetable = ({ bus_station_id, bus_id, subway_station_id }) => {
    const queryString = qs.stringify({
        bus_station_id,
        bus_id,
        subway_station_id,
    });
    return client.get(`/api/timetable?${queryString}`);
};
