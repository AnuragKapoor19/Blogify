const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/generateToken");
const cloudinary = require('cloudinary')

const createUser = async (req, res) => {
    try {
        const { name, email, password, avatar, role } = req.body

        const result = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'blogapp',
            width: 150,
            crop: 'scale'
        })

        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: newPassword,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            },
            role
        })

        const token = await generateToken({ id: user._id });

        res.status(201)
            .cookie('token', token, { expires: new Date(Date.now() + 604800000), httpOnly: true })
            .json({
                success: true,
                message: "New User created successfully"
            })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//Get User
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email not found"
            })
        }

        const cmpPassword = await bcrypt.compare(req.body.password, user.password)

        if (!cmpPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password!"
            })
        }

        const token = await generateToken({ id: user._id })

        res.status(200)
            .cookie('token', token, { expires: new Date(Date.now() + 604800000), httpOnly: true, sameSite: 'None', secure: true })
            .json({
                success: true,
                message: "Logged in successfully"
            })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200)
            .cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
            .json({
                success: true,
                message: "User Logged out successfully"
            })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { createUser, getUser, logoutUser, getUserProfile };