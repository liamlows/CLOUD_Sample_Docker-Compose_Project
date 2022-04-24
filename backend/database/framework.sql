-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;


DROP TABLE customer_event_interests, farmer, product, transactions, users, requests, customer_inventory, cart, event;
-- NEW NEW NEW NEW NEW
-- EPIC 1

CREATE TABLE users(
    user_id INTEGER AUTO_INCREMENT, PRIMARY KEY(user_id),
	email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
	first_name VARCHAR(50),
    last_name VARCHAR(50),
    isFarmer tinyint(1) NOT NULL DEFAULT FALSE
);

CREATE TABLE farmer (
    farmer_id INTEGER AUTO_INCREMENT, PRIMARY KEY (farmer_id),
    farm_name VARCHAR(50),
    farm_description VARCHAR(50),
    farm_image_url VARCHAR(500),
    date_founded DATE,
    owner_id INTEGER NOT NULL, FOREIGN KEY (owner_id) REFERENCES users(user_id)
);
-- EPIC 4

SELECT * FROM users;
CREATE TABLE transactions(
	transaction_id integer auto_increment, primary key(transaction_id),
    customer_id INTEGER NOT NULL, FOREIGN KEY (customer_id) REFERENCES users(user_id),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id),
    product_id VARCHAR(50),
    quantity integer,
    is_complete tinyint(1) NOT NULL DEFAULT FALSE,
    total_price varchar(50) not null,
    product_name VARCHAR(50) NOT NULL,
    purchaseDate VARCHAR(50),
    
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    zip VARCHAR(50),
    cardName VARCHAR(50),
    cardNumber VARCHAR(50),
    cardExprDate VARCHAR(50)
);
CREATE TABLE cart(
    cart_id INTEGER NOT NULL AUTO_INCREMENT, PRIMARY KEY (cart_id),
    cart_price INTEGER,
    quantity INTEGER,
    customer_id VARCHAR(50),
    product_id INTEGER
);

CREATE TABLE event(
    event_id integer auto_increment, PRIMARY KEY(event_id),
    event_name VARCHAR(50),
    event_description VARCHAR(50),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)
);
CREATE TABLE customer_event_interests(
	customer_event_interests_id integer auto_increment, PRIMARY KEY(customer_event_interests_id),
    event_id VARCHAR(50),
    event_name VARCHAR(50),
    event_description VARCHAR(50),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id),
    customer_id INTEGER NOT NULL, FOREIGN KEY (customer_id) REFERENCES users(user_id)
);

CREATE TABLE cart(
    cart_id INTEGER NOT NULL AUTO_INCREMENT, PRIMARY KEY (cart_id),
    product_count INTEGER,
    user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id),
    cart_price INTEGER,
    quantity INTEGER
);
CREATE TABLE product(
    product_id INTEGER NOT NULL AUTO_INCREMENT,  PRIMARY KEY(product_id),
    product_name VARCHAR(50) NOT NULL,
    product_price VARCHAR(50) NOT NULL,
    product_stock INTEGER NOT NULL,
    product_category VARCHAR(50) NOT NULL,
    product_description VARCHAR(50),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id),
    cart_id INTEGER NOT NULL, FOREIGN KEY(cart_id) REFERENCES cart(cart_id)
);


CREATE TABLE requests(
    request_id INTEGER NOT NULL AUTO_INCREMENT, PRIMARY KEY (request_id),
    request_type VARCHAR(50),
    product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id),
    product_count INTEGER,
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)

);

CREATE TABLE customer_inventory(
    product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id),
    product_count INT,
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)

);

SELECT * FROM farmer;

INSERT INTO users(email, password, first_name, last_name, isFarmer)
VALUES ('smu@email.edu', 'Password123', 'John', 'Deere', 1),
       ('cool@gmail.com', 'password', 'Mark', 'Fontenot', 0);

INSERT INTO farmer(farm_name, farm_description, farm_image_url, date_founded, owner_id)
VALUES ('Johns Farm', 'LETS GOOOOO', 'https://st.depositphotos.com/1333205/2857/i/600/depositphotos_28571959-stock-photo-farm-building.jpg', '1999-03-23', 1);

