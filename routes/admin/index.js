const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const router = express.Router()
const userdb = require('../../models/userdb')
const boarddb = require('../../models/boarddb')
const list = [...boarddb.data]


app.set('view engine', 'html')
nunjucks.configure('views', { express: app })

router.get('/user', (req, res) => {
    // res.send('관리자 유저페이지 입니다')
    res.render('admin/adminUser', { list: userdb })
})

router.post('/user', (req, res) => {
    res.redirect('/admin/adminUser')

})

router.get('/board', (req, res) => {
    // res.send('관리자 게시판페이지 입니다')
    res.render('admin/adminBoard', { list })
})



module.exports = router