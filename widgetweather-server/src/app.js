const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')
const { callbackify } = require('util')

const app = express()


// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Turtle'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
    title: 'Weather app',
    name: 'Turtle'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
    helpText: 'thats crazzzzy',
    title: 'Help',
    name:'jesus'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res ) =>{
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) =>{
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
               return res.send ({ error }) 
        }
        
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
            })
        
        })
    })
})

app.get('/products', (req, res) => {
    if  (!req.query.search)    {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'404',
        name:'nibaaaaa',
        errorMessage:'help article not found'
    })
})

app.get('*', (req, res ) =>{
    res.render('404', {
        title: '404',
        name: 'niba',
        errorMessage:'wrong move'
    })
})

app.listen(3000, () => {
    console.log('Server up, port 3000! kekw')
})