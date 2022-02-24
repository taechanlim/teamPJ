const express = require('express')
const router = express.Router()
const userdb = require('../../models/userdb')
const boarddb = require('../../models/boarddb')
const list = [...boarddb.data]
const pool = require('../../models/boarddb2')
const pools = require('../../models/userdb1')


router.get('/user', (req, res) => {
    pools.getConnection((err, connection) => {
        connection.query(`SELECT userId, userPw, userName, nickname, gender, phonenumber FROM userdb`, (error, result) => {   //   수정 필요
            if (error) {
                throw error
            } else {
                res.render('admin/adminUser', { list: result })
                connection.release()
            }
        })
    })
})

router.post('/user', (req, res) => {
    res.redirect('/admin/adminUser')

})

router.get('/board', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`select idx,subject,nickname,content,DATE_FORMAT(date,'%Y-%m-%d') as date,hit from board`, (error, result) => {
            if (error) {
                throw error
            } else {
                res.render('admin/adminBoard', { list: result })
                connection.release()
            }
        })
    })
})

router.post('/board', (req, res) => {

})



module.exports = router