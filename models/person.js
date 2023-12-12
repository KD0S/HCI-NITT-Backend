const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String, 
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    mail: {
        type: String
    },
    imgPath: {
        type: String
    },
    linkedin: {
        type: String
    },
    gscholar: {
        type: String
    },
    github: {
        type: String
    },
    number: {
        type: String
    },
    publications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication'
        }
    ]
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)