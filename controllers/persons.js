const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', async (request, response) => {
    const persons = await Person.find({})
    response.json(persons)
})

personsRouter.get('/:id', async(request, response, next) => {
    try {
        const person = await Person.findById(request.params.id)
        if (person) response.json(person)
        else response.status(404).end()
    } catch (exception) {
        next(exception)
    }
})

personsRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.name === undefined || body.role === undefined || body.designation === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name : body.name,
        role : body.role,
        designation : body.designation,
        address : body.address,
        mail : body.mail,
        imgPath : body.imgPath,
        linkedin : body.linkedin,
        gscholar : body.gscholar,
        github : body.github,
        number : body.number,
    })
    
    const savedPerson = await person.save()
    response.json(savedPerson)
})

personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(()=>{
        response.json(204).end()
    }).catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next)=> {
    const body = request.body

    const person = {
        name : body.name,
        role : body.role,
        designation : body.designation,
        address : body.address,
        mail : body.mail,
        imgPath : body.imgPath,
        linkedin : body.linkedin,
        gscholar : body.gscholar,
        github : body.github,
        number : body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {
        new: true, context: 'query'})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

module.exports = personsRouter