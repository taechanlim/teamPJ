const express = require('express')
const router = express.Router()
const pool = require('../../models/boarddb2.js')

router.get('/list',(req,res)=>{
    pool.getConnection((err, connection) => {
        
        connection.query('select * from board',
        (error, result) => {
        if (error) {throw error}
            else{
                res.render('board/list',{list:result})
            }
        })
    })
})

router.get('/view',(req,res)=>{
    const index = req.query.idx //정상
    pool.getConnection((err, connection) => {
        connection.query(`select * from board where idx=${index}`,
        (error, result) => {
        if (error) {throw error}
            else{
                res.render('board/view',{list:result})
            }
        })
    })  
})


router.get('/write',(req,res)=>{
    res.render('board/write')
})


router.post('/write',(req,res)=>{
    let board = {...req.body}
    let {subject,content} = board
    let nickname = req.session.user.nickname
    let schemafields = [subject,content,nickname]
    let sql = `INSERT INTO board(subject,content,nickname,date,hit) values(?,?,?,CURRENT_TIMESTAMP,0) `
    pool.getConnection((err, connection) => {
        connection.query(sql,schemafields,(error, result) => {
        if (!error) { 
            res.redirect('/board/list')
        }else {
                throw error
            }
        })
    })
})

router.post('/delete',(req,res)=>{
    const index = req.body.idx
    console.log(index)
    pool.getConnection((err, connection) => {
        let sql = `DELETE from board WHERE idx=${index}`
            connection.query(sql,(error, result) => {
            if (!error) {
                res.redirect('/board/list')
            }else {
                    throw error
                }
        })
    })
})
router.get('/update',(req,res)=>{
    const index = req.query.idx
    const view = list[index-1]
    res.render('board/update',{
        item:view,
        index:index,
    })
})
router.post('/update',(req,res)=>{
    const index = req.body.idx
    const item = {
        idx : req.body.idx,
        subject:req.body.subject, 
        nickname:req.body.nickname,
        content:req.body.content,
        date:req.body.date,
        hit:req.body.hit,
    }
    list[index-1] = item
    res.redirect(`/board/view?idx=${index}`)
})

module.exports = router
