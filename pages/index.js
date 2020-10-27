import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import api from '../services/api'
import { format } from 'date-fns'

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
  const [date, setDate] = useState(new Date());

  let getWeather = async (lat, long) => {
    let res = await api.get("/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: "89a8eaef589c3f138309b13362a87d12",
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location == false) {
    return (
      <>
        Você precisa habilitar a localização no browser o/
      </>
    )
  } else if (weather == false) {
    return (
      <>
        Carregando o clima...
      </>
    )
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.infoLocal}>

          <div className={styles.infoLocalHead}>
            <div className={styles.infoLocalHeadLocation}>
              <h1>{weather.name}</h1>
              <p>{format(new Date(date), 'dd MMM yyyy')}</p>
              <p>{weather['weather'][0]['description']}</p>
            </div>
            <div className={styles.infoLocalHeadInformations}>
              <p>Humidade: {weather['main']['humidity']}%</p>
              <p>Vento: {weather['wind']['speed']}km/h</p>
            </div>
          </div>
          <div className={styles.infoLocalHeadTemp}>
            <img src={"http://openweathermap.org/img/wn/" + weather['weather'][0]['icon'] + "@2x.png"} alt="Logo" className={styles.img} />
            <h1 className={styles.infoLocalTempTitle}>{weather['main']['temp']}°C</h1>
          </div>

          <div className={styles.infoLocalHeadTempMaxMin}>
            <h1 className={styles.infoLocalHeadTempMax}>Max. Temp<br /> {weather['main']['temp_max']}°C </h1>
            <h1 className={styles.infoLocalHeadTempMin}>Min. Temp<br /> {weather['main']['temp_min']}°C </h1>
          </div>

        </div>

      </div>
    );
  }
}

export default App;