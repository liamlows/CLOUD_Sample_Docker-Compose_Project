CREATE DATABASE db;
USE db;
CREATE TABLE users (
	userID int(11) AUTO_INCREMENT PRIMARY KEY,
	username varchar(255),
	userEmail varchar(255),
	password varchar(255),
	role varchar(255)
	);

CREATE TABLE friends (
	userID1 int(11),
	userID2 int(11)
	);


CREATE TABLE battles (
	battleID int(11) AUTO_INCREMENT PRIMARY KEY,
	battleTopic varchar(255),
	user1 varchar(255),
	user2 varchar(255),
	timeCreated datetime,
	timeClosed datetime
	);

CREATE TABLE messages (
	messageID int(11) AUTO_INCREMENT PRIMARY KEY,
	battleID int(11),
	message varchar(1024),
	senderName varchar(255),
	senderID int(11),
	timestamp datetime
	);
	

