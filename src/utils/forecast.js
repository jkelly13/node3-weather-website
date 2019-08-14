const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/29e475abe676113e9cbc910e3f62cd07/${latitude},${longitude}?units=us`
    
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service.')
        } else if (response.body.error) {
            callback('Unable to calculate proper coordinates.')
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability * 100}% chance of rain.`)
        }
    })
}

module.exports = forecast