const Blog = require('../models/blogModel')
const cloudinary = require('cloudinary')

const createBlog = async (req, res) => {
    try {
        const { title, content, image, category } = req.body

        const result = await cloudinary.v2.uploader.upload(image, {
            folder: 'blogapp'
        })

        const blog = await Blog.create({
            title,
            content,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            author: req.user._id,
            category
        })

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()

        res.status(200).json({
            success: true,
            blogs
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name")

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "No Blog Found"
            })
        }

        res.status(200).json({
            success: true,
            blog
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "No Blog Found"
            })
        }

        await cloudinary.v2.uploader.destroy(blog.image.public_id)

        await Blog.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const addComment = async (req, res) => {
    try {
        const { comment } = req.body

        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "No Blog Found"
            })
        }

        let isCommented = blog.comments.find((item) => item.user.toString() === req.user._id.toString())

        if (isCommented) {
            blog.comments.map((item) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return item.comment = comment
                }
            })
        }
        else {
            await blog.comments.push({ user: req.user._id, comment })
        }

        await blog.save()

        res.status(200).json({
            success: true,
            message: "Comment Added successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const addLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog.likes) {
            blog.likes = 1;
        }
        else {
            blog.likes += 1;
        }

        blog.save();

        res.status(200).json({
            success: true,
            message: "Like added"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const removeLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (blog.likes === 0 || !blog.likes) {
            blog.likes = 0;
        }
        else {
            blog.likes -= 1;
        }

        blog.save();

        res.status(200).json({
            success: true,
            message: "Like removed"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { createBlog, getAllBlogs, getBlog, deleteBlog, addComment, addLike, removeLike }