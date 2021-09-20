import qs from 'qs';

import client from "./client";


export const getTimetable = ({ station_id, bus_id }) => {
    const queryString = qs.stringify({
        station_id,
        bus_id,
    });
    return client.get(`/api/timetable?${queryString}`);
};
