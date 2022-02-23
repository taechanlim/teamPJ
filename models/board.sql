use team;

CREATE TABLE board(
    idx int auto_increment primary key,
    subject varchar(50) not null,
    nickname varchar(40) not null,
    content text not null,
    date timestamp DEFAULT CURRENT_TIMESTAMP not null,
    hit int not null);

-- INSERT INTO board(subject,nickname,content,hit) values('제목1','별명1','내용1',0)
