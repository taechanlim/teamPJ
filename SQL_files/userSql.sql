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

