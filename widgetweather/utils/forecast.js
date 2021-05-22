const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7a6560438245f2c8f05cac6b79e363b9&query=' + latitude + ',' + longitude

    request({url: url, json: true}, (error, response) =>{
    if (error) {
        callback('Unable to connect to weather service.', undefined)
    } else if (response.body.error) {
        callback('Unable to find location.', undefined)
    } else {
        callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees. Feels like ' + response.body.current.feelslike + ' degrees.')
    }
    })
}



module.exports = forecast