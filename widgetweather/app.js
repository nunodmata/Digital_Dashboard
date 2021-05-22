// weatherstack.com     token=7a6560438245f2c8f05cac6b79e363b9
//mapbox.com            token=

 const geocode = require('./utils/geocode')
 const forecast = require ('./utils/forecast')
// const url = 'http://api.weatherstack.com/current?access_key=7a6560438245f2c8f05cac6b79e363b9&query=37.8267,-122.4233'

const address = process.argv[2]

if (!address){
        console.log('Please provide an adress!')
} else {
        
geocode (address, (error, data) => {
    if (error){
        return console.log(error)
    }

    forecast(data.latitude ,data.longitude, (error, forecastData) => {
        if(error){
            return console.log(error)
        }
        
        console.log(data.location)
        console.log(forecastData)
    } )
})

}
