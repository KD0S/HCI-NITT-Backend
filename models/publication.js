const mongoose = require('mongoose')

const publicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    persons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ]

})

publicationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Publication', publicationSchema)