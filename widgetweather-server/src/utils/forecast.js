const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7a6560438245f2c8f05cac6b79e363b9&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body} ) =>{
    if (error) {
        callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
        callback('Unable to find location.', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. Feels like ' + body.current.feelslike + ' degrees. Local date and time is ' + body.location.localtime + '.')
    }
    })
}



module.exports = forecast