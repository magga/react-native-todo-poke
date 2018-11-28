import { combineReducers } from 'redux';

import todos from './TodoLocalReducer';
import weather from './WeatherReducer';

export default combineReducers({
    todos, weather
});
