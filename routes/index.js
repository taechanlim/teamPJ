const express = require('express')
const router = express.Router()
const user = require('../models/userdb')
const boardRouter = require('./board/index')
const userRouter = require('./user/index')
const { alertmove } = require('../util/alert')
const adminRouter = require('./admin/index')
const { rawListeners } = require('../models/userdb1')



const Access = (req, res, next) => {
    let { user } = req.session
    if (user != undefined) {
        next()
    } else {
        res.send(alertmove('/', '회원만 가능한 기능입니다'))
    }
}
const AdminAccess = (req, res, next) => {
    let { user } = req.session
    if (user != undefined) {

        const userId = req.session.user.userId
        if (userId === 'admin') {
            next()
        } else {
            res.send(alertmove('/', '관리자 전용 기능입니다')) // 로그인 성공했으나 Admin이 아닌경우
        }
    } else {
        res.send(alertmove('/', '회원만 가능한 기능입니다')) // 로그인 자체가 안된 경우
    }
}

router.get('/', (req,res) => {
    let {user} = req.session
    res.render('index',{
        user
    })
})

//board 라우터 모음

router.use('/board', Access, boardRouter)


//admin 라우터 모음
router.use('/admin', AdminAccess, adminRouter)


//user
router.use('/user', userRouter)


module.exports = router
