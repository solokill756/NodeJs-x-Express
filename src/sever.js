require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const hostName = process.env.HOST_NAME
const port = process.env.PORT || 8888
app.set('views' , path.join(__dirname, 'views'))
app.set('View engine', 'ejs')

app.get('/', function (req, res) {
  res.render('simple.ejs')
})

app.get('/abc', function (req, res) {
  res.send('Hello World abccde !')
})

app.listen(port , hostName , () => {
    console.log('listening on port ' + port)
})