const personsRouter = require('express').Router()
const Person = require('../models/person')
const  Publication = require('../models/publication')

personsRouter.get('/', async (request, response) => {
    const persons = await Person.find({}.populate('publications'))
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

    const person = new Person({
        name : body.name,
        role : body.role,
        designation : body.designation,
    })
    
    const savedPerson = await person.save()
    
})
