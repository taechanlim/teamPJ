const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
    res.send('안녕하세요')
})

module.exports = router