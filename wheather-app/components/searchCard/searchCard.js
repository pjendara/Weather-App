import { useState, useRef } from "react"
import Image from 'next/image'
import searchIcon from "../../public/sicon.png"
import s from "./searchCard.module.css"

const apiKey = process.env.NEXT_PUBLIC_API_KEY

export default function SearchBar() {
  
  const cityInput = useRef()
  const [cityWeather, setWeather] = useState({})
  const [cityForecast, setForecast] = useState({})
  const [isError, setIsError] = useState(false)
  
  
  async function getCityWeather () {
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
         cityInput.current.value +
        "&appid=" + apiKey +
        "&units=metric" +
        "&lang=es"
      )
  
      const data = await res.json()
      data.cod !== "404"? [setWeather(data), setIsError(false)] :
      [setIsError(true), setWeather({})]
      
                  
    } catch (err) {
      console.log(err)
    }
  }

  async function getCityForecast () {
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
         cityInput.current.value +
        "&appid=" + apiKey +
        "&units=metric" +
        "&lang=es"
      )
  
      const data = await res.json()
      data.cod !== "404"? setForecast(data) : setForecast({})
               
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={s.card}  >
      <div className="flex justify-center">
        <p className="font-mono font-bold m-4 text-zinc-50 text-center">Ingresa la Ciudad que deseas consultar</p>
      </div>
          <div className="flex flex-row justify-center">
              <input 
                className="shadow-xl p-2 focus:outline-none capitalize"
                placeholder="  Ej:Bogotá"
                ref={cityInput}
              />
              <button className="cursor-pointer transition ease-out hover:scale-95"
               onClick={() => [getCityWeather(), getCityForecast()]} disabled={cityInput === "" ? true : false}>
                <Image className="m-2" src={searchIcon} alt="icono de busqueda" width={40} height={40} /> 
              </button>
          </div>
            {isError &&
              <p className="flex justify-center font-normal m-5 text-red-600">no existe la ciudad, revísela e intente de nuevo</p> 
            }
      { Object.keys(cityWeather).length !== 0 ?
        <div className="flex flex-col justify-center">
          <div className="flex justify-center items-center">
             <h3 className="font-bold font-mono text-sky-900 text-4xl">{cityWeather.name}</h3>
             <Image
             src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
             width={90}
             height={80}
             />
          </div>
          <div className="flex justify-center">
            <div className="text-slate-100 font-medium font-serif block text-center">
              <p>Condiciones actuales: {cityWeather.weather[0].description}</p>
              <p>Temp. actual: {cityWeather.main.temp} °C</p> 
              <p>Temp. mínima: {cityWeather.main.temp_min} °C</p> 
              <p>Temp. máxima: {cityWeather.main.temp_max} °C</p> 
            </div>
          </div>
        </div>
     
      :null }

      { Object.keys(cityForecast).length !== 0 && isError !== true ? 
      
        <div className="mt-8 block">
          <div className="flex justify-center">  
            <p className="font-bold font-mono text-sky-900 text-2xl">Los Próximos 5 días</p>
          </div>
        <ul className="flex justify-around">
            {cityForecast.list.slice(0, 5).map((e) => (
            <li className="m-2" key={e.index}> 
              <div className="flex justify-around align-top">
                <div className="flex flex-col justify-center align-middle text-slate-100 text-xs font-extralight font-serif mt-1 text-center">
                  <div className="flex justify-center">
                  <Image
                    src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
                    width={50}
                    height={40}
                  />
                  </div>
                  <p>mín: {e.main.temp_min}</p>
                  <p>máx: {e.main.temp_max}</p>
                </div>
              </div>
            </li>
            ))}
        </ul>
        </div>  
        
        : null}
        
    </div>
  )
}





