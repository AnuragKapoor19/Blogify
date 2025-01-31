const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter this field"],
    },
    email: {
        type: String,
        required: [true, "Please enter this field"]
    },
    password: {
        type: String,
        required: [true, "Please enter this field"]
    },
    avatar: {
        public_id: {
            type: String,
            required: [true, "Please enter this field"]
        },
        url: {
            type: String,
            required: [true, "Please enter this field"]
        }
    },
    role: {
        type: String,
        enum: ['admin', 'author','reader'],
        default: 'reader'
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)