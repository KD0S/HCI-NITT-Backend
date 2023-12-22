const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const publicationsRouter = require('./controllers/publications')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB: ', 
            error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)
app.use('/api/publications', publicationsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

