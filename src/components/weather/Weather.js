import Geocode from "react-geocode";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import React, { useState, useEffect } from 'react';


function Weather() {
    /*Default longitude and latitude of auckland if user not giving position promition*/
    const [Lat, setLat] = useState(-36.848461);
    const [Lon, setLon] = useState(174.763336);
    const [CityName, setCityName] = useState('auckland')
    navigator.geolocation.getCurrentPosition(function (position) {
        //obtain current location(ongitude and latitude)
        var tempLat = position.coords.latitude;
        setLat(tempLat)
        var tempLon = position.coords.longitude;
        setLon(tempLon)

    });

    Geocode.setApiKey("AIzaSyDLuXEt1-yQN40VIvIvRrWlKYTvgiYXAV0");
    //obtain address by longitude and latitude
    Geocode.setLanguage("en");
    Geocode.fromLatLng(Lat, Lon).then(
        (response) => {
            const address = response.results[0].formatted_address;
            let city, state, country;
            for (let i = 0; i < response.results[0].address_components.length; i++) {
                for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                    if(response.results[0].address_components[i].types[j]=="locality"){
                        city = response.results[0].address_components[i].long_name;
                    }  
                }
            }
            setCityName(city)
        },

    );

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '3c0f0c02bd1958d7beff972efb3a8b8e',//weather api key
        lat: Lat,
        lon: Lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    return (
        <div>
            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel={CityName}
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
        </div>
    );
}

export default Weather;
