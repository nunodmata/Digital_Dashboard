// weatherstack.com     token=7a6560438245f2c8f05cac6b79e363b9
//mapbox.com            token=

const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=7a6560438245f2c8f05cac6b79e363b9&query=37.8267,-122.4233'

request ({ url: url, json: true }, (error, response) =>{
    console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees. Feels like ' + response.body.current.feelslike + ' degrees.')
})


const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZG51bmVzdGhldHVydGxlIiwiYSI6ImNrb3d6czV5bjA5YWIydnBjdTAyNjBvaHUifQ.Cd8kStxwx32Zab0ceCU_Zg&limit=1'

request ({url: geocodeURL, json: true}, (error, response) => {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]

    console.log(latitude, longitude)
})