const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter this field"],
    },
    content: {
        type: String,
        required: [true, "Please enter this field"]
    },
    image: {
        public_id: {
            type: String,
            required: [true, "Please enter this field"]
        },
        url: {
            type: String,
            required: [true, "Please enter this field"]
        }
    },
    category: {
        type: String,
        enum: ['Technology', 'Productivity', 'Finance', "Health", "Travel"],
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number
    },
    unlikes: {
        type: Number
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('blog', blogSchema)