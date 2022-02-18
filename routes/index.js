const express = require('express')
const router = express.Router()
const boardRouter = require('./board/index')

router.get('/',(req,res)=>{
    res.render('index')
})



//board 라우터 모음
router.use('/board',boardRouter)

module.exports = router
