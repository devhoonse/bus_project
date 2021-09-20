import qs from 'qs';

import client from "./client";


export const getSetting = ({ user_id }) => {
    const queryString = qs.stringify({
        user_id
    });
    return client.get(`/api/setting?${queryString}`);
};


export const postSetting = ({ user_id }) => client.post('/api/setting', { user_id });
