const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) response.json(blog)
        else response.status(404).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async(request, response) => {
    const body = request.body

    const blog = new Blog({
        title : body.title,
        author : body.author,
        date : body.date,
        description : body.description,
        blogPath : body.blogPath
    })

    const savedBlog = await blog.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', (request, response) => {
    Blog.findByIdAndDelete(request.params.id).then(() =>{
        response.status(204).end()
    })
})

module.exports = blogsRouter