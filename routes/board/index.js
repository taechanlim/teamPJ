const express = require('express')
const router = express.Router()
const pool = require('../../models/boarddb2.js')


router.get('/list',(req,res)=>{
    const pagenum = req.query.p
    pool.getConnection((err, connection) => {
        connection.query(`select idx,subject,nickname,content,DATE_FORMAT(date,'%Y-%m-%d') as date,hit from board order by idx desc
         Limit ${(pagenum-1)*5},5`,
        (error, result) => {
        if (error) {throw error}
            else{
                let page = pagenum
                let view_article = 10;
                let total_record = result.length; 
                let total_pages = Math.ceil(total_record/view_article)
                let block_article = 10;
                let blocks = Math.ceil(total_pages/block_article)
                let current_block = Math.ceil(page/block_article)
                let pages = []
                for(let i=1; i<=view_article;i++){
                    pages.push((current_block-1)*view_article+(i))
                }
                res.render(`board/list`,{
                    list:result,
                    pages,
                })
                connection.release()
            }
        })
    })
})

router.get('/view',(req,res)=>{
    const index = req.query.idx
    const userId = req.session.user.userId
    let myContent
    let Sql = `select * from board WHERE idx=${index} ; UPDATE board SET hit=hit+1 WHERE idx=${index}`
    pool.getConnection((err, connection) => {
        connection.query(Sql,
        (error, result) => {
        if (error) {throw error}
            else{
                if(userId === result[0][0].nickname){
                    myContent=1
                }else{
                    myContent=0
                }
                res.render('board/view',{list:result[0],myContent})
                connection.release()
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
    let nickname = req.session.user.userId
    let schemafields = [subject,content,nickname]
    let sql = `INSERT INTO board(subject,content,nickname,date,hit) values(?,?,?,now(),0) ; ALTER TABLE board AUTO_INCREMENT=1 ; 
    SET @COUNT = 0 ; UPDATE board SET idx = @COUNT:=@COUNT+1;`
    pool.getConnection((err, connection) => {
        connection.query(sql,schemafields,(error, result) => {
        if (!error) { 
            res.redirect(`/board/list?p=1`)
            connection.release()
        }else {
                throw error
            }
        })
    })
})

router.post('/delete',(req,res)=>{
    const index = req.body.idx
    pool.getConnection((err, connection) => {
        let sql = `DELETE from board WHERE idx=${index} ; ALTER TABLE board AUTO_INCREMENT=1 ; 
        SET @COUNT = 0 ; UPDATE board SET idx = @COUNT:=@COUNT+1;`
            connection.query(sql,(error, result) => {
            if (!error) {
                res.redirect('/board/list?p=1')
                connection.release()
            }else {
                    throw error
                }
        })
    })
})

router.get('/update',(req,res)=>{
    const index = req.query.idx
    pool.getConnection((err, connection) => {
        connection.query(`select * from board where idx='${index}'`,
        (error, result) => {
        if (error) {throw error}
            else{
                res.render('board/update',{list:result[0]})
                connection.release()
            }
        })
    })
})


router.post('/update',(req,res)=>{
    let board = req.body
    
    let sql = `UPDATE board SET subject='${board.subject}',content='${board.content}' WHERE idx=${board.idx}`
    pool.getConnection((err, connection) => {
        connection.query(sql,(error, result) => {
        if (!error) { 
            res.redirect(`/board/view?idx=${board.idx}`)
            connection.release()
        }else {
                throw error
            }
        })
    })
})

module.exports = router
