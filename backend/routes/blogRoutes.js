const express = require('express')
const { createBlog, getAllBlogs, getBlog, deleteBlog, addComment, addLike, removeLike } = require('../controllers/blogControllers')
const router = express.Router()
const authenticate = require('../middlewares/authentication')

router.post('/new/blog', authenticate, createBlog)

router.get('/blogs', getAllBlogs)

router.get('/blog/:id', authenticate, getBlog)

router.delete('/blog/:id', authenticate, deleteBlog)

router.put('/blog/:id', authenticate, addComment)

router.put('/blog/like/:id', authenticate, addLike)

router.put('/blog/unlike/:id', authenticate, removeLike)

module.exports = router