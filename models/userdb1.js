require('dotenv').config()
const mysql = require('mysql')
let host=process.env.DB_HOST || 'localhost'
let user=process.env.DB_USER || 'hancoco'
let password=process.env.DB_PASSWORD || '0000'
let database=process.env.DB_DATABASE || 'userdb'

let connection = mysql.createConnection({
    host,
    user,
    password,
    database
})

const config={host,user,password,database,connectionLimit:5}
const pool = mysql.createPool(config)

pool.getConnection((err,conn)=>{
    conn.query('select * from userdb',(err,result)=>{
        console.log('hello db')
    })
}) //실행됨

module.exports = pool