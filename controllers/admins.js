const adminsRouter = require('express').Router()
const Admin = require('../models/admins')

adminsRouter.get('/', async(request, response) => {
    const admins = await Admin.find({})
    response.json(persons)
})

adminsRouter.get('/:id', async(request, response) => {
    try {
        const admin = Admin.findById(request.params.id)
        if (Admin) response.json(admin)
        else response.status(404).end()
    } catch (exception) { 
        next(exception)
    }
})

adminsRouter.post('/', async(request, response) => {
    const body = request.body

    if (body.rollNo === undefined) return response.status(400).json({error : 'Admin ID missing'})

    const admin = new Admin({
        rollNo : body.rollNo
    })

    const savedAdmin = await admin.save()
    response.json(savedAdmin)
})

adminsRouter.delete('/:id', (request, response, next) => {
    Admin.findByIdAndDelete(request.params.id).then(() => {
        response.json(204).end()
    }).catch(error => next(error))
})

module.exports = adminsRouter