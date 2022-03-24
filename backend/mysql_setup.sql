-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

-- create table in db
CREATE TABLE `db`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `value` VARCHAR(45), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');

-- create table in db
CREATE TABLE 'db'.'StudentEnrollment' (
    `id` INT NOT NULL AUTO_INCREMENT, 
    'studentID' VARCHAR NOT NULL,
    'schoolID' VARCHAR NOT NULL, 
    FOREIGN KEY('studentID') REFERENCES Student('id') 
    FOREIGN KEY('schoolID') REFERENCES School('id') 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

-- create table in db
CREATE TABLE 'db'.'Waitlist' (
    `id` INT NOT NULL AUTO_INCREMENT, 
    'studentID' VARCHAR NOT NULL,
    'schoolID' VARCHAR NOT NULL, 
    'timestamp' datetime NOT NULL,
    FOREIGN KEY('studentID') REFERENCES Student('id') 
    FOREIGN KEY('schoolID') REFERENCES School('id') 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);
