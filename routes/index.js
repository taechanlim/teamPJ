const express = require('express')
const router = express.Router()
const user = require('../models/userdb')
const boardRouter = require('./board/index')
const adminRouter = require('./admin/index')


// const Access = (req,res,next)=>{
//     let { user }=req.session
//     if(user != undefined){
//        next()
//     }else{
//         res.send(alertmove('/','회원만 가능한 기능입니다'))
//     }
// }


router.get('/', (req, res) => {
    res.render('index')
})



//board 라우터 모음
router.use('/board', boardRouter)

//admin 라우터 모음
router.use('/admin', adminRouter)

module.exports = router
