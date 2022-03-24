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

-- ACCOUNT TABLE
CREATE TABLE 'db'.'account' (
    'account_id' INT SERIAL NOT NULL,
    'username' VARCHAR(100) NOT NULL,
    'password' VARCHAR(255) NOT NULL,
    'student_id' INT,
    'role_id' INT,
    'logged_in' BOOLEAN NOT NULL DEFAULT 0,
    'last_logged_in' DATETIME DEFAULT 0,
    PRIMARY KEY ('account_id'),
    FOREIGN KEY ('student_id') REFERENCES student('student_id'),
    FOREIGN KEY ('role_id') REFERENCES course_roles('role_id')
);

-- SCHOOL TABLE
CREATE TABLE 'db'.'school' (
    'school_id' INT SERIAL NOT NULL,
    'school_name' VARCHAR(255) NOT NULL,
    'school_location' VARCHAR(255) NOT NULL,
    PRIMARY KEY ('school_id')
)

-- STUDENT TABLE
CREATE TABLE 'db'.'student' (
    'student_id' INT,
    'school_id' INT
)