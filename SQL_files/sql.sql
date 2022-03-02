use team;
-- use [database명]

CREATE TABLE board(
    idx int auto_increment primary key,
    subject varchar(50) not null,
    nickname varchar(40) not null,
    content text not null,
    date timestamp DEFAULT CURRENT_TIMESTAMP not null,
    hit int not null
);


-- 만약 글을 모두 지웠을때 idx값을 1부터 다시시작하려면
-- ALTER TABLE board AUTO_INCREMENT=1;
-- SET @COUNT = 0;
-- UPDATE board SET idx = @COUNT:=@COUNT+1;
-- select subject,nickname,content,DATE_FORMAT(date,'%Y-%m-%d %h:%m:%s') as date,hit from board; 게시판 리스트 시간표시

-- 경로복사&붙여넣기하면 적용됨
-- opt+cmd+c
-- use userSql;

CREATE TABLE userdb(
    userid varchar(15) not null primary key,
    userpw varchar(15) not null,
    username varchar(15) not null,
    nickname varchar(15) not null,
    gender varchar(15) not null,
    phoneNumber int(15) not null,
    level int(1) not null,
    active int(1) not null
);
