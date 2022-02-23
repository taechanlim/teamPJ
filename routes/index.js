const { application } = require('express')
const express = require('express')
const router = express.Router()
const user = require('../models/userdb')
const boardRouter = require('./board/index')
const userRouter = require('./user/index')
const {alertmove} = require('../util/alert')
const adminRouter = require('./admin/index')
const { rawListeners } = require('../models/userdb1')


const Access = (req,res,next)=>{
    let { user }=req.session
    if(user != undefined){
       next()
    }else{
        res.send(alertmove('/','회원만 가능한 기능입니다'))
    }
}


router.get('/', (req,res) => {
    console.log(req.session)
    res.render('index')
})

//board 라우터 모음
router.use('/board',Access,boardRouter)

//admin 라우터 모음
router.use('/admin', adminRouter)


//user
router.use('/user',userRouter)


module.exports = router
