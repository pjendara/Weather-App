import Image from 'next/image'

export default function DefaultBar( {cityWeather} ) {

  return (
    <div>
    {cityWeather &&
        <div className="w-full h-30 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-880 shadow-l shadow-gray-400 gap-5 px-3 py-2">
          <h3 className="font-bold font-mono text-red-700 text-2xl"> {cityWeather.name} </h3>
          <Image
            src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
            width={80}
            height={70}
          />
          <div className='flex gap-5 font-light text-sm text-center'> 
          <p className="font-serif">Condiciones actuales: {cityWeather.weather[0].description} </p>
          <p className="font-serif">Temp. actual: {cityWeather.main.temp} °C </p>
          <p className="font-serif">Temp. mínima: {cityWeather.main.temp_min} °C </p>
          <p className="font-serif">Temp. máxima: {cityWeather.main.temp_max} °C </p>
          </div>
        </div>
         }
    </div>     
  )
}
