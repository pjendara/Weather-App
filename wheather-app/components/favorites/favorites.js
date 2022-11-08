import { useState, useEffect } from "react"
import Image from 'next/image'
import searchIcon from "../../public/sicon.png"

const apiKey = process.env.NEXT_PUBLIC_API_KEY

let favoritesCities =[]
let showFavorites =[]

export default function Favorites() {
  const [addFavorite, setAddFavorite] = useState("")
  const [mostrar, setMostrar] = useState(showFavorites)
  const [favWeather, setFavWeather] = useState({})

  useEffect(() => {
    setMostrar(getFavorites())
  }, []) 


  function addLocalFavorite () {
    favoritesCities.unshift(addFavorite)
    localStorage.setItem("favoritos", JSON.stringify(favoritesCities))
    setMostrar(getFavorites())
    
  }

  function getFavorites () {
    let localFavorites = localStorage.getItem("favoritos")
    return showFavorites = JSON.parse(localFavorites)
     
  }

  
  async function showFavWeather (fav) {
      console.log(fav, "esto es fav")
      try {
        const res = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
           fav +
          "&appid=" + apiKey +
          "&units=metric" +
          "&lang=es"
        )
    
        const data = await res.json()
        data.cod !== "404"? setFavWeather(data) : setFavWeather({})
                 
      } catch (err) {
        console.log(err)
      }
    }
 
    

  return (
    <div>
      <div className="flex flex-row justify-center">
          <input 
            className="shadow-xl p-2 focus:outline-none capitalize"
            placeholder="  Ej:Bogotá"
            onChange={(e) => setAddFavorite(e.target.value) }
          />
          <button className="cursor-pointer transition ease-out hover:scale-95"
          onClick={() => addLocalFavorite()} disabled={addFavorite === "" ? true : false}>
            <Image className="m-2" src={searchIcon} alt="icono de busqueda" width={40} height={40} /> 
          </button>
      </div>
      <div>
          <ul>
            {mostrar && mostrar.map((e) => (
              <li>
                <a value={e} onClick={(e) => showFavWeather(e.target.value)}>
                  {e}
                </a>
              </li>
            )

            )
            }
          </ul>
      </div>

      { Object.keys(favWeather).length !== 0 ?
        <div className="flex flex-col justify-center">
          <div className="flex justify-center items-center">
             <h3 className="font-bold font-mono text-sky-900 text-4xl">{favWeather.name}</h3>
             <Image
             src={`http://openweathermap.org/img/wn/${favWeather.weather[0].icon}@2x.png`}
             width={90}
             height={80}
             />
          </div>
          <div className="flex justify-center">
            <div className="text-slate-100 font-medium font-serif block text-center">
              <p>Condiciones actuales: {favWeather.weather[0].description}</p>
              <p>Temp. actual: {favWeather.main.temp} °C</p> 
              <p>Temp. mínima: {favWeather.main.temp_min} °C</p> 
              <p>Temp. máxima: {favWeather.main.temp_max} °C</p> 
            </div>
          </div>
        </div>
     
      :null }      


    </div>
  )
}
