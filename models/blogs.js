const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    author : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    blogPath : {
        type : String,
        required : true
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
