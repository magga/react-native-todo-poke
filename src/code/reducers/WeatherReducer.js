import { FETCH_WEATHER } from './../actions/types';

const INITIAL_STATE = {
    todaysWeather: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_WEATHER:
            return { ...state, todaysWeather: action.payload };
        default:
            return state;
    }
};
