const express = require('express')
const router = express.Router()
const userdb = require('../../models/userdb')
const boarddb = require('../../models/boarddb')
const list = [...boarddb.data]
const pool = require('../../models/boarddb2')

router.get('/user', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT userID, userPW, userName, nickName, gender, phoneNumber FROM userdb`, (error, result) => {   //   수정 필요
            if (error) {
                throw error
            } else {
                res.render('admin/adminUser', { list: result })
                connection.release()
            }
        })
    })
    // res.send('관리자 유저페이지 입니다')
    res.render('admin/adminUser', { list: userdb })
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