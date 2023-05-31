import axios from "axios";
import React, { useState, useEffect } from "react";
import "./WeatherForecastDay";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";


export default function WeatherForecast(props){
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);

    useEffect(() => {
        setLoaded(false);
    }, [props.coordinates]);

    function handleResponse(response){
        setForecast(response.data.daily);
        setLoaded(true);
    }

    if(loaded){
        console.log(forecast);
        return(
            <div className="WeatherForecast">
                <div className="row">
                    {forecast.map(function (dailyForecast, index) {
                        if (index < 6) {
                            return (
                                <div className="col" key={index}>
                                    <WeatherForecastDay data={dailyForecast} />
                                </div>
                            );
                        } else {
                            return null;
                        }

                    })}

                </div>
            </div>
        ) 
    } else{
        const apiKey = "ded93636eb7b5fe9e7d49e20c4422f20";
        let longitude = props.coordinates.lon;
        let latitude = props.coordinates.lat;
        let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl).then(handleResponse);

        return null;
    }

}