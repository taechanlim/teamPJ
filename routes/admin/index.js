const express = require('express')
const router = express.Router()
const userdb = require('../../models/userdb')
const pool = require('../../models/boarddb2')


router.get('/user', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT userId, userPw, userName, nickname, gender, phonenumber, level, active FROM userdb`, (error, result) => {   //   수정 필요
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
    let userId = req.body.userId;
    let level = req.body.level;
    let active = req.body.active;
    pool.getConnection((err, connection) => {
        connection.query(`UPDATE userdb SET level=${level},active=${active} WHERE userid='${userId}'`, (error, result) => {
            if (error) {
                throw error
            } else {
                res.redirect('/admin/user')
                connection.release()
            }
        })
    })
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
    let select = req.body;
    let keylist = Object.keys(select);
    console.log(Object.keys(select))
    let idxStr = ""
    const boardOutIdx = keylist.forEach(v => idxStr = idxStr + v.slice(5,) + ',')
    idxStr = idxStr.slice(0, -1);
    pool.getConnection((err, connection) => {
        let sql = `DELETE from board WHERE idx in (${idxStr}); ALTER TABLE board AUTO_INCREMENT=1 ; 
        SET @COUNT = 0 ; UPDATE board SET idx = @COUNT:=@COUNT+1;`
        connection.query(sql, (error, result) => {
            if (!error) {
                res.redirect('/admin/board')
                connection.release()
            } else {
                throw error
            }
        })
    })
})


module.exports = router