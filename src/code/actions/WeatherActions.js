import axios from 'axios';
import qs from 'qs';

import { FETCH_WEATHER } from './types';

export const FetchWeather = (lat, lon) => {
    const query = qs.stringify({
        lat,
        lon,
        APPID: 'ec343a14494a97a4a6dc3e9d44aa066d',
        units: 'metric'
    });

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?${query}`)
            .then((response) => {
                dispatch({
                    type: FETCH_WEATHER,
                    payload: response.data
                });

                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    };
};
