show databases; 

create database TextbookFoundation;

use TextbookFoundation;

show tables;

select * from users;

INSERT INTO users(firstName, lastName, phoneNumber, email, username, password, private, joinDate) VALUES ('colin', 'weil', '100000000', 'eamil', 'cweil', 'weil', true, '2020-02-02');


create table users(
	userID	int(7) unsigned auto_increment primary key,
	firstName	varchar(255),
	lastName	varchar(255),
	phoneNumber	int(10),
	email	varchar(255),
	username	varchar(255) not null,
	password	varchar(255) not null,
	private	boolean,
	joinDate	datetime default current_timestamp
);

create table books(
	bookID	int(7) not null auto_increment,
    primary key(bookID),
	donorID int(7) unsigned,
	ISBN	int(13) not null,
	Title	varchar(255) not null,
	Author	varchar(255),
	Publisher	varchar(255),
	publicationDate	datetime,
	bookCondition	int(1),
	borrowerID	int(7) unsigned,
	donationDate	datetime default current_timestamp,
    foreign key(donorID) references users(userID),
    foreign key(borrowerID) references users(userID)
);

create table ratings(
	bookID	int(7) primary key,
	rating	int(1),
	borrowerID	int(7) unsigned,
    foreign key(borrowerID) references users(userID)
);

create table favorites(
	userID	int(7) unsigned,
	ISBN	int(13) not null,
	foreign key(userID) references users(userID)
);