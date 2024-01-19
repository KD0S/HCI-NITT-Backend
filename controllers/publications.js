const publicationsRouter = require('express').Router()
const Person = require('../models/person')
const  Publication = require('../models/publication')

publicationsRouter.get('/', async (request, response) => {
    const publications = await Publication.find({})
    response.json(publications)
})

publicationsRouter.get('/:id', async(request, response, next) => {
    try {
        const publication = await Publication.findById(request.params.id)
        if (publication) response.json(publication)
        else response.status(404).end()
    } catch (exception) {
        next(exception)
    }
})

publicationsRouter.post('/', async (request, response) => {
    const body = request.body

    const publication = new Publication({
        name : body.name,
        type : body.type,
        link : body.link,
        year : body.year,
        authors: body.authors,
        publisher: body.publisher,
        member_ids: body.member_ids
    })
    
    const savedPublication = await publication.save()
    response.json(savedPublication)
})

publicationsRouter.delete('/:id', (request, response, next) => {
    Publication.findByIdAndDelete(request.params.id).then(()=>{
        response.json(204).end()
    }).catch(error => next(error))
})

publicationsRouter.put('/:id', (request, response, next)=> {
    const body = request.body

    const publication = {
        name : body.name,
        type : body.type,
        link : body.link,
        year : body.year,
        authors: body.authors,
        publisher: body.publisher,
        member_ids: body.member_ids
    }

    Publication.findByIdAndUpdate(request.params.id, publication, {
        new: true, context: 'query'})
        .then(updatedPublication => response.json(updatedPublication))
        .catch(error => next(error))
})

module.exports = publicationsRouter