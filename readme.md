# git pull origin main 으로 변경사항 가져온 뒤 작업해주세요
# server.js 파일에 app.use(express.static('public') 

## 각 라우터에서 넘겨줄 변수는 해당 라우터와 연결된 html 파일을 참고해주세요
## user
- userId
- userPw
- userName
- nickname
- birth
- gender
- number
- phoneNumber
- level: 1,2,3으로 나눠짐
- active: 1(활동상태), 0(활동정지)

## board
- idx
- subject
- nickname
- content
- date: 타임스탬프로 mysql저장
- hit

### 그 외 변수
- join페이지에서 비밀번호 확인하는 checkPw
- view페이지에서 사용자 확인해서 수정,삭제 버튼 뜨도록 하는 checkUser

### 계속 내용 추가 예정
