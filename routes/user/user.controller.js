const express = require('express')
const router = express.Router()
const userdb = require('../../models/userdb')
const {alertmove} = require('../../util/alert')

const login = (req, res) => {
    //로그인 된 사용자는 접근 못함
    res.render('user/login') //화면 렌더링
}

const loginCheck = (req, res) => {
    // 세션 생성
    const {userId,userPw} = req.body
    let [item] = userdb.filter(v => v.userId===userId && v.userPw===userPw)
    if(item!=undefined){
        if(item.userId!=undefined){
            req.session.user={...item}
            res.redirect('/')
        }
    } else {
        //아이디와 패스워드가 틀렸다고 알림뜨기.
        res.send(alertmove('/user/login','아이디와 비민번호를 확인해주세요.'))
        // res.redirect('/') //홈으로 보내기
    }
}

const join = (req, res) => {
    //로그인된 사용자는 접근 못함
    res.render('user/join') //화면 렌더링
}

const joinCheck = (req, res) => {
    //로그인된 사용자는 접근 못함
    res.render('user/join') //화면 렌더링
}

const welcome = (req, res) => {
    //1. 가입만하고 로그인은 되지 않은 상태 or 가입 즉시 로그인이 된 상태
    // 가입한 회원의 정보를 가져와서 화면에 보이게
    res.render('user/welcome') //화면 렌더링
}

const profile = (req, res) => {
    //로그인한 회원의 정보를 가져와서 화면에 보이도록
    //로그인한 사용자본인+관리자계정에게만 페이지 보이게
    res.render('user/profile') //화면 렌더링
}

const logout = (req, res) => {
    //로그인했던 사용자 세션 삭제
    // req.session.destroy(() => {
    //     req.session;
    //   });
    res.redirect('/')//메인화면으로 보내기
}


// DB 스키마 짜기
// 필요한 필드
// --> userId, userPw, userName, nickname, gender, phoneNumber, level, active
// birth, number항목은 models에 있는 임시 데이터파일에 있는데 그냥 빼주세요.

module.exports = {
    login,
    loginCheck,
    join,
    joinCheck,
    welcome,
    profile,
    logout
}