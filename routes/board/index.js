const express = require('express')
const router = express.Router()
const boarddb = require('../../models/boarddb')
const list = [...boarddb.data]


router.get('/list',(req,res)=>{
    res.render('board/list',{list : list})
})

router.get('/view',(req,res)=>{
    const index = req.query.idx
    const view = list[index-1]
    res.render('board/view',{
        item:view,
        index:index,
    })
})

router.get('/write',(req,res)=>{
    res.render('board/write')
})


router.post('/write',(req,res)=>{
    let board = {...req.body}
    console.log(board)
    for(let i=1 ;i<=list.length+1;i++){
        board.idx = i
    }
    list.push(board)
    console.log(list)
    
    res.redirect('/board/list')
})

router.post('/delete',(req,res)=>{
    const index = req.body.idx-1
    list.splice(index,1)
    res.redirect('/board/list')
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
