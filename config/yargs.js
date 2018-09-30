const options = {
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
};
const argv = require('yargs').options(options).argv;

module.exports = {
    argv
};