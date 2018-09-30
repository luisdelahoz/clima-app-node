const {argv} = require('./config/yargs');
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const googleApiKey = process.env.GOOGLE_API_KEY;
const openWeatherMapApiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

if(googleApiKey === undefined) {
    console.log('No esta establecida la variable de entorno GOOGLE_API_KEY'); return;
} else if(openWeatherMapApiKey === undefined) {
    console.log('No está establecida la variable de entorno OPEN_WEATHER_MAP_API_KEY'); return;
}

const getInfo = async(direccion) => {

    try {
        let location = await lugar.getLugarLatLngES7(direccion, googleApiKey);
        let weather = await clima.getClima(location.lat, location.lng, openWeatherMapApiKey);
        return `El clima en ${location.direccion} es de ${weather.temp}°C`;
    } catch(e) {
        return `No se pudo determinar el clima en ${direccion}`;
    }

};

getInfo(argv.direccion)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));