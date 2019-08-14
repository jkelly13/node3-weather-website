const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'J Monay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'J Monay',
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is the help message',
        title: 'Help',
        name: 'J Monay'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
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
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.',
        name: 'J Monay',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        name: 'J Monay',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})