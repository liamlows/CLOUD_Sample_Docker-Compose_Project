-- create database db
CREATE DATABASE nft_marketplace;

-- use newly create database
USE nft_marketplace;

-- create table in db
CREATE TABLE nft_marketplace.user (
    id INT NOT NULL AUTO_INCREMENT, 
    username VARCHAR(45),
    password VARCHAR(45),
    privileges INT NOT NULL DEFAULT 1,

    name VARCHAR(45),
    email VARCHAR(60),
    PRIMARY KEY (id)
);

SELECT * FROM nft_marketplace.nft;

TRUNCATE nft_marketplace.nft;


