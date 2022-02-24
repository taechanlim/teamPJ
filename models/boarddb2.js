require('dotenv').config()
const mysql = require('mysql')

const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'taechan'
const password = process.env.DB_PASSWORD || '9688'
const database = process.env.DB_DATABASE || 'team'

const config = {host,user,password,database,connectionLimit:5,multipleStatements:true}

const pool = mysql.createPool(config)


module.exports = pool

