const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true
    }
})

adminSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Admin', adminSchema)