const axios = require('axios');

const getClima = async(lat, lng, apiKey) => {

    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`);

    return response.data.main;
    
};

module.exports = {
    getClima
};