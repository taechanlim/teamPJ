const express = require('express')
const router = express.Router()
const userdb = require('../../models/userdb')
const userController = require('./user.controller')


router.get('/login',userController.login)
router.post('/login',userController.loginCheck)

router.get('/join',userController.join)
router.post('/join',userController.joinCheck)

router.get('/welcome',userController.welcome)

router.get('/profile',userController.profile)

router.get('/logout',userController.logout)


module.exports = router