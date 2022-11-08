import Head from 'next/head'
import s from '../styles/Home.module.css'
import SearchBar from '../components/searchCard/searchCard'
import DefaultBar from '../components/defaultBar/defaultBar'
import Favorites from '../components/favorites/favorites'

const city = process.env.PRE_CITY
const apiKey = process.env.NEXT_PUBLIC_API_KEY


export default function Home( {data} ) {
  
  return (
    <div className={s.prinDiv}>

      <Head>
        <title>Weather App</title>
        <meta name="Pj's Weather App" content="Aplicación para obtener información del clima" />
        <link rel="icon" href="/favicon.ico" />
      </Head>  
      
      <DefaultBar cityWeather={data}/>

      <div className="mt-7 flex justify-center">
      <SearchBar/>
      </div>

      {/* <div>
        <Favorites/>
      </div> */}
      
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
                           city +
                          "&appid=" + apiKey +
                          "&units=metric" +
                          "&lang=es"
                         )
  const data = await res.json()
  
    return {
    props: {
      data
    }
  }
}