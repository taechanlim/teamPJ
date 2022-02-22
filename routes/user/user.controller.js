const express = require('express')
const router = express.Router()
const {userdb} = require('../../models/userdb')
const {alertmove} = require('../../util/alert')
require('dotenv').config()
const mysql = require('mysql')
const pool = require('../../models/userdb1')


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
            //홈으로 보내기
            res.send(alertmove('/','로그인 되었습니다.'))
        }
    } else {
        //아이디와 패스워드가 틀렸다고 알림뜨기.
        res.send(alertmove('/user/login','아이디와 패스워드를 확인해주세요.'))
    }
    //로그인상태는 세션으로 처리하기
}

const join = (req, res) => {
    //로그인된 사용자는 접근 못함
    res.render('user/join') //화면 렌더링
}

const joinCheck = (req, res) => {
    //입력창을 전부 입력하지 않았을때
    const {userId,userPw,checkPw,userName,nickname,gender,phoneNumber} =req.body

    //아무것도 입력하지 않았을때
    let blankFlag = (userId==''||userPw==''||checkPw==''||userName==''||nickname==''||gender==''||phoneNumber=='')
    if(blankFlag==true){
        //아무것도 입력하지 않았을때 출력결과
        res.send(alertmove('/user/join','입력창에 입력을 모두 해주세요'))
    } else {
        //모두 입력을 했을때 이후 로직
        //기존 유저중에 같은 id가 있을때
        let [checkId] = userdb.filter(v=>(v.userId===userId))
        const regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식
        let phoneNumberFix = phoneNumber.replace(regex,"") //숫자외 값은 ''로 처리

        if (checkId!=undefined){
            res.send(alertmove('/user/join','동일한 아이디가 있습니다. 다른 아이디를 입력해주세요'))
        } else if(userPw!=checkPw){
            //비밀번호가 서로 같지 않을때 출력결과
            res.send(alertmove('/user/join','비밀번호가 서로 같지 않습니다. 다시 입력해주세요'))
        } else if((phoneNumberFix<5)){
            //전화번호가 5자리 이하를 입력했을때 출력결과
            res.send(alertmove('/user/join','전화번호를 다시 입력해주세요'))
        } else{
            //회원리스트에 추가
            let userdata = req.body
            delete userdata.checkPw //확인 비밀번호 제거
            userdata.level='1' // 가입시 레벨 1
            userdata.active='1' // 허용 레벨 1
            // console.log(userdata)
            req.session.user={...userdata} // 데이터에 저장할 완성본
            
            pool.getConnection((err, conn) => {
                const sql = "INSERT INTO userdb SET ?" //입력값을 폼 그대로 가져옴.
                conn.query(sql,userdata,function(error, result){ //sql값을 userdata 데이터베이스에 넣음.
                    if (!error) {
                        // const ID = result[0].userId
                        console.log(sql)
                        res.send(alertmove('/user/welcome','회원가입이 완료되었습니다.'))
                    }
                    else {
                        throw error
                    }
                })
            })
        }
    }
}

const welcome = (req, res) => {
    //1. 가입만하고 로그인은 되지 않은 상태 or 가입 즉시 로그인이 된 상태
    
    // 가입한 회원의 정보를 가져와서 화면에 보이게
    const {user} = req.session

    //화면 렌더링
    res.render('user/welcome',{
        item:user
    }) 
}

const profile = (req, res) => {
    //로그인한 회원의 정보를 가져와서 화면에 보이도록
    //로그인한 사용자본인+관리자계정에게만 페이지 보이게
    // console.log(req.session)
    const {user} = req.session
    res.render('user/profile',{
        item:user
    }) //화면 렌더링
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