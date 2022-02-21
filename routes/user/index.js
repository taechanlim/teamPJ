const express = require('express')
const router = express.Router()
const boarddb = require('../../models/userdb')
const userController = require('./user.controller')


router.get('/login',userController.login)
router.post('/login',userController.login)

router.get('/join',userController.join)
router.post('/join',userController.join)

router.get('/welcome',userController.welcome)

router.get('/profile',userController.profile)

router.get('/logout',userController.logout)


module.exports = router