const express = require('express')
const router = express.Router()
const boarddb = require('../../models/boarddb')

router.get('/list',(req,res)=>{
    res.render('board/list',{list : boarddb})
})

router.get('/view',(req,res)=>{
    res.render('board/view')
})

router.get('/write',(req,res)=>{
    res.render('board/write')
})

router.get('/update',(req,res)=>{
    res.render('board/update')
})

module.exports = router
