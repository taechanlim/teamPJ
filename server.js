const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const session = require('express-session')
const { urlencoded } = require('express')
const Memorystore = require('memorystore')(session)
const router = require('./routes/index')
const PORT = process.env.PORT || 3000

app.set('view engine', 'html')
nunjucks.configure('views', { express: app })

const maxAge = 5*60*1000

let sessionObj = {
    secret:"teamPJ",
    resave: false,
    saveUninitialized:true,
    store:new Memorystore({ checkPeriod: maxAge }),
    cookie:{
        maxAge:maxAge
    }
}

app.use(session(sessionObj))

app.use(express.urlencoded({extended:true,}))
app.use(express.static('public'))

const userdb = require('./models/userdb')


// main
app.use(router)



// admin
app.get('/admin', (req, res) => {
    res.render('admin/admin', { list: userdb })
})




app.listen(3000, () => { console.log("서버시작") })