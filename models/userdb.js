let userdb = [
    {
        userId: 'admin',
        userPw: 'admin',
        userName: '관리자',
        nickname: '관리관리',
        gender: '여자',
        phoneNumber: '01011112222',
        level: 1,
        active: 1 //회원 차단 여부
    }
]

// 일반 가입자 레벨 1 && 관리자 레벨 2
// 허용 상태 : 1 && 차단 상태 0


//같은 id, pw를 찾음
function idpwCheck(result,userId,userPw){
    for(let i=0; i<result.length; i++){
        if((result[i].userid===userId && result[i].userpw===userPw)==true){
            return true
        }
    }
}

//같은 id를 찾음
function idCheck(result,userId){
    for(let i=0; i<result.length; i++){
        if(result[i].userid!==undefined){
            if(result[i].userid===userId)
            return true
        }
    }
}

module.exports = {
    userdb,
    idpwCheck,
    idCheck,
}