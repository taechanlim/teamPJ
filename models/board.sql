use team;
-- use [database명]

CREATE TABLE board(
    idx int auto_increment primary key,
    subject varchar(50) not null,
    nickname varchar(40) not null,
    content text not null,
    date timestamp DEFAULT CURRENT_TIMESTAMP not null,
    hit int not null);


-- 만약 글을 모두 지웠을때 idx값을 1부터 다시시작하려면
-- ALTER TABLE [테이블명] AUTO_INCREMENT=1;
-- SET @COUNT = 0;
-- UPDATE [테이블명] SET [AUTO_INCREMENT 열 이름] = @COUNT:=@COUNT+1;

