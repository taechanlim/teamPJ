// 화면 확인용 테스트페이지입니다.


const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const router = require('./routes/index')

app.set('view engine', 'html')
nunjucks.configure('views', { express: app })

app.use(express.urlencoded({extended:true,}))

const userdb = require('./models/userdb')


// main
app.use(router)


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


// admin
app.get('/admin', (req, res) => {
    res.render('admin/admin', { list: userdb })
})




app.listen(3000, () => { console.log("서버시작") })