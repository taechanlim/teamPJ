const express = require('express')
const router = express.Router()

const login = (req, res) => {
    res.render('user/login')
}

const join = (req, res) => {
    res.render('user/join')
}

const welcome = (req, res) => {
    res.render('user/welcome')
}

const profile = (req, res) => {
    res.render('user/profile')
}

const logout = (req, res) => {
    res.render('user/logout')
}

module.exports = {
    login,
    join,
    welcome,
    profile,
    logout
}