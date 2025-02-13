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
        let { search, category, page } = req.query;
        const limit = 6;
        const skip = limit * (page - 1);
        let filter = {}

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]
        }

        if (category) {
            filter.category = category
        }

        // let blogs;

        // if (!search && !category) {
        //     const totalCount = await Blog.countDocuments();
        //     blogs = await Blog.aggregate([{ $sample: { size: totalCount } }]);
        // }
        // else {
        //     blogs = await Blog.find(filter)
        // }

        const blogs = await Blog.find(filter).skip(skip).limit(limit);

        const totalBlogs = await (await Blog.find(filter)).length

        if (blogs.length <= 0) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            })
        }

        res.status(200).json({
            success: true,
            blogs,
            totalPages: Math.ceil(totalBlogs / limit)
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getRelatedBlogs = async (req, res) => {
    try {
        let blogs = await Blog.aggregate([
            {
                $match: {
                    category: req.query.category,
                    _id: { $ne: req.query.blogId }
                }
            },
            { $sample: { size: 2 } } // Randomly select 2 blogs
        ]);

        // Convert to Mongoose models and populate
        blogs = await Blog.populate(blogs, { path: "author", select: "name" });

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
        const blog = await Blog.findById(req.params.id).populate("author", "name").populate("comments.user", "name avatar")

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

//Author Controllers
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

const getAuthorBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id })

        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "No Blog Found"
            })
        }

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

const updateBlog = async (req, res) => {
    try {
        const { title, content, image, category } = req.body;

        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "No Blog Found!"
            })
        }

        if (!blog.author === req.user._id) {
            return res.status(403).json({
                success: false,
                message: `Your are not authorized!`
            })
        }

        if (image) {
            await cloudinary.v2.uploader.destroy(blog.image.public_id)

            const result = await cloudinary.v2.uploader.upload(image)

            let imageLink = { public_id: result.public_id, url: result.secure_url }

            blog.image = imageLink
        }

        if (title) {
            blog.title = title
        }

        if (content) {
            blog.content = content
        }

        if (category) {
            blog.category = category
        }

        await blog.save()

        res.status(200).json({
            success: true,
            message: "Blog Updated Successfully!"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { createBlog, getAllBlogs, getBlog, deleteBlog, addComment, addLike, removeLike, getAuthorBlogs, updateBlog, getRelatedBlogs }