const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const pokemonRoutes = require('./controllers/pokemon')

const app = express()

//Routes
app.use('/pokemon', pokemonRoutes)

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT
app.listen(PORT, console.log(`listening quietly on ${PORT}`))