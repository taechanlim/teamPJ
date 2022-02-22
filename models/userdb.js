let userdb = [
    {
        userId: 'admin',
        userPw: 'admin',
        userName: '관리자',
        nickname: '관리관리',
        gender: '여자',
        phoneNumber: '01011112222',
        // 회원가입시 생성 후, 데이터베이스에 저장. 로그인할때마다 정보 가져오도록.
        // level: 1,
        // active: 1
    }
]

// 일반 가입자 레벨 1 && 관리자 레벨 2
// 로그인 상태 : 1 && 로그아웃 상태 0

module.exports = {
    userdb,
}