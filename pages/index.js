import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import api from '../services/api'
import { format } from 'date-fns'

export default function Home() {
  const [weather, setWeather] = useState({});
  const [description, setDescription] = useState();
  const [icon, setIcon] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [temp, setTemp] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [date, setDate] = useState(new Date());

  const [main, setMain] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();


  async function showInformationsForLocation(lat, lot) {
    try {
      const { data } = await api.get('/weather?lat=' + lat + '&lon=' + lot + '&appid=89a8eaef589c3f138309b13362a87d12&lang=pt');
      await setWeather(data);
      await setDescription(data.weather[0].description)
      await setIcon("http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
      await setHumidity(data.main.humidity)
      await setWind(data.wind.speed)
      await setTemp(data.main.temp)
      await setMaxTemp(data.main.temp_max)
      await setMinTemp(data.main.temp_min)
    } catch (error) {
      console.log(error);
    }
  }

  function getLocation() {
    try {
      window.onload = function () {
        var startPos;
        var geoSuccess = function (position) {
          startPos = position;
          setLongitude(position.coords.longitude)
          setLatitude(position.coords.latitude)
          showInformationsForLocation(position.coords.latitude, position.coords.longitude)
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);
      };
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(async () => {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }

    getLocation()
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoLocal}>

        <div className={styles.infoLocalHead}>
          <div className={styles.infoLocalHeadLocation}>
            <h1>{weather.name}</h1>
            <p>{format(new Date(date), 'dd MMM yyyy')}</p>
            <p>{description}</p>
          </div>
          <div className={styles.infoLocalHeadInformations}>
            <p>Humidade: {humidity}%</p>
            <p>Vento: {wind}km/h</p>
          </div>
        </div>
        <div className={styles.infoLocalHeadTemp}>
          <img src={icon} alt="Logo" className={styles.img} />
          <h1 className={styles.infoLocalTempTitle}>{temp}°F</h1>
        </div>

        <div className={styles.infoLocalHeadTempMaxMin}>
          <div>

          </div>
          <h1 className={styles.infoLocalHeadTempMax}>Max. Temp<br /> {maxTemp}°F </h1>
          <h1 className={styles.infoLocalHeadTempMin}>Min. Temp<br /> {minTemp}°F </h1>

        </div>

      </div>

      <div className={styles.infoWeek}>

      </div>

    </div>
  )
}
