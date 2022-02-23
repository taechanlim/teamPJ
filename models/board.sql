use team;
-- use [database명]

CREATE TABLE board(
    idx int auto_increment primary key,
    subject varchar(50) not null,
    nickname varchar(40) not null,
    content text not null,
    date timestamp DEFAULT CURRENT_TIMESTAMP not null,
    hit int not null);


