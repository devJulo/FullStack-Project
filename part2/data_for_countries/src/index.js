import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const template =     {
    "request": {
        "type": "",
        "query": "",
        "language": "",
        "unit": ""
    },
    "location": {
        "name": "",
        "country": "",
        "region": "",
        "lat": "",
        "lon": "",
        "timezone_id": "",
        "localtime": "",
        "localtime_epoch": "",
        "utc_offset": ""
    },
    "current": {
        "observation_time": "",
        "temperature": "no infos",
        "weather_code": "",
        "weather_icons": [
            ""
        ],
        "weather_descriptions": [
            ""
        ],
        "wind_speed": "no infos",
        "wind_degree": "",
        "wind_dir": "no infos",
        "pressure": "",
        "precip": "",
        "humidity": "",
        "cloudcover": "",
        "feelslike": "",
        "uv_index": "",
        "visibility": "",
        "is_day": ""
    }

}
ReactDOM.render(<App template={template}/>, document.getElementById('root'));


