const express = require('express')
const { createUser, getUser, logoutUser, getUserProfile } = require('../controllers/userControllers')
const authenticate = require('../middlewares/authentication')
const router = express.Router()

//Create a new user
router.post('/new/user', createUser)

//User Login
router.get('/user', getUser)

//LOgout User
router.get('/logout/user', logoutUser)

//Get User Profile
router.get('/me', authenticate, getUserProfile)

module.exports = router