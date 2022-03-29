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

-- create users table
CREATE TABLE `db`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255), 
    `role` VARCHAR(100),
    `password` VARCHAR(255), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');


