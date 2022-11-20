import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

interface MainData {
  temp: number
  weather: string
  feels_like: string
  humidity: number
}

interface WindData {
  speed: number
}

interface WeatherData {
  name: string
  main: MainData | null
  wind: WindData | null
}

function App() {
  const [data, setData] = useState<WeatherData>({
    name: '',
    main: null,
    wind: null,
  })

  const [location, setLocation] = useState<string>('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=en&units=metric&appid=cbb432a3507e58ebea05da61a8461ca1`

  const useLocation = () => {
    axios.get<WeatherData>(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ): void => {
    setLocation(e.target.value)
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={handleOnChange}
          placeholder="Enter a location..."
          type="text"
        />
        <button onClick={useLocation}>Search</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {data.main ? <p>{data.main.weather}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p>{data.main.feels_like}°C</p> : null}
            <h4>Sensed temperature</h4>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <h4>Humidity</h4>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed}MPH</p> : null}
            <h4>Wind speed</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
