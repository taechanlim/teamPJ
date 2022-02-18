// 화면 확인용 테스트페이지입니다.


const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.set('view engine', 'html')
nunjucks.configure('views', { express: app })


const boarddb = require('./models/boarddb')
const userdb = require('./models/userdb')




// main
app.get('/', (req, res) => {
    res.render('index')
})





// user
app.get('/user/login', (req, res) => {
    res.render('user/login')
})

app.get('/user/join', (req, res) => {
    res.render('user/join')
})

app.get('/user/welcome', (req, res) => {
    res.render('user/welcome')
})

app.get('/user/profile', (req, res) => {
    res.render('user/profile')
})




// board
app.get('/board/list', (req, res) => {
    res.render('board/list', { list: boarddb })
})

app.get('/board/view', (req, res) => {
    res.render('board/view')
})

app.get('/board/write', (req, res) => {
    res.render('board/write')
})

app.get('/board/update', (req, res) => {
    res.render('board/update')
})



// admin
app.get('/admin', (req, res) => {
    res.render('admin/admin', { list: userdb })
})




app.listen(3000, () => { console.log("서버시작") })