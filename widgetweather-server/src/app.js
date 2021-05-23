const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res ) =>{
    res.send({
        forecast: 'yeet sun',
        location:'gui'
    })
})



app.listen(3000, () => {
    console.log('Server up, port 3000! kekw')
})