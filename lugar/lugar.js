const axios = require('axios');

const getLugarLatLngES7 = async(direccion, apiKey) => {

    let encodedUrl = encodeURI(direccion);
    
    let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=${apiKey}`);

    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${direccion}}`);
    } else {
        let results = response.data.results[0];
        let address = results.formatted_address;
        let location = results.geometry.location;
        
        return {
            direccion: address,
            lat: location.lat,
            lng: location.lng
        };
    }

};

const getLugarLatLngES6 = (direccion, apiKey) => {

    let encodedUrl = encodeURI(direccion);

    return new Promise((resolve, reject) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=${apiKey}`)
            .then((response) => {
                if(response.data.status === 'ZERO_RESULTS') {
                    reject(`No hay resultados para la ciudad ${direccion}}`);
                } else {
                    let results = response.data.results[0];
                    let address = results.formatted_address;
                    let location = results.geometry.location;
                    
                    resolve({
                        direccion: address,
                        lat: location.lat,
                        lng: location.lng
                    });
                }
            }).catch((error) => {
                reject(error);
            });
    });
    
};

module.exports = {
    getLugarLatLngES7,
    getLugarLatLngES6
};