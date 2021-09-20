import qs from 'qs';

import client from "./client";


export const getArrival = ({ station_id, bus_id }) => {
    const queryString = qs.stringify({
        station_id,
        bus_id,
    });
    return client.get(`/api/arrival?${queryString}`);
};
