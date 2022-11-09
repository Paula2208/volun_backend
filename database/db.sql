CREATE DATABASE IF NOT EXISTS nodelogin;

USE nodelogin;

CREATe TABLE IF NOT EXISTS users (
    username VARCHAR(45) NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(45) NOT NULL
);

DESCRIBE users;

INSERT INTO `nodelogin`.`USERS` (`username`, `email`, `password`) VALUES ('agarfield', 'agarfield@mail.com', '1234');
INSERT INTO `nodelogin`.`USERS` (`username`, `email`, `password`) VALUES ('usuario1', 'usuario1@mail.com', 'asdf');
INSERT INTO `nodelogin`.`USERS` (`username`, `email`, `password`) VALUES ('angie', 'angie@mail.com', 'asdf');
INSERT INTO `nodelogin`.`USERS` (`username`, `email`, `password`) VALUES ('camilo09', 'camilo09@mail.com', '987654');