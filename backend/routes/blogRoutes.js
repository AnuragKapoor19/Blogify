const express = require('express')
const { createBlog, getAllBlogs, getBlog, deleteBlog, addComment, addLike, removeLike, getAuthorBlogs, updateBlog, getRelatedBlogs } = require('../controllers/blogControllers')
const router = express.Router()
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

router.post('/new/blog', authenticate, authorize('author'), createBlog)

router.get('/blogs', getAllBlogs)

router.get('/blog/:id', getBlog)

router.get('/related/blogs', getRelatedBlogs)

router.delete('/blog/:id', authenticate, authorize('author'), deleteBlog)

router.put('/blog/:id', authenticate, addComment)

router.put('/blog/like/:id', authenticate, addLike)

router.put('/blog/unlike/:id', authenticate, removeLike)

router.get('/author/blogs', authenticate, authorize('author'), getAuthorBlogs)

router.put('/author/blog/:id', authenticate, authorize('author'), updateBlog)

module.exports = router