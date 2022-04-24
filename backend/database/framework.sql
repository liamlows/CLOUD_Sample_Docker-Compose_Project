-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;



-- NEW NEW NEW NEW NEW
-- EPIC 1
CREATE TABLE farmer (
    farm_name VARCHAR(50),
    farm_description VARCHAR(50)
);
CREATE TABLE users(
	email VARCHAR(50) NOT NULL, PRIMARY KEY(email),
    password VARCHAR(50) NOT NULL,
	first_name VARCHAR(50),
    last_name VARCHAR(50),
    isFarmer BOOL default false
);
-- EPIC 4
CREATE TABLE transactions(
	transaction_id integer not null auto_increment, primary key(transaction_id),
    customer_id VARCHAR(50), 
    farmer_id VARCHAR(50),
    product_id VARCHAR(50),
    quantity integer,
    price varchar(50) not null,
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
-- EPIC 7
CREATE TABLE event(
    event_id integer not null auto_increment, PRIMARY KEY(event_id),
    event_name VARCHAR(50),
    event_description VARCHAR(50),
    farmer_id VARCHAR(50)
);
CREATE TABLE customer_event_interests(
	customer_event_interests_id integer not null auto_increment, PRIMARY KEY(customer_event_interests_id),
    event_id VARCHAR(50),
    event_name VARCHAR(50),
    event_description VARCHAR(50),
    farmer_id VARCHAR(50),
    customer_id VARCHAR(50)
);

-- OLD OLD OLD
/*------------------------APP CAPABILITIES----------------------------*/

CREATE TABLE requests(
    request_id INTEGER NOT NULL AUTO_INCREMENT,
    request_type VARCHAR(50),
    product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id),
    product_count INT,
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES product(farmer_id)

);
DROP TABLE  requests;

CREATE TABLE cart(
    cart_id INTEGER NOT NULL AUTO_INCREMENT, PRIMARY KEY (cart_id),
    cart_price INTEGER,
    quantity INTEGER,
    customer_id VARCHAR(50),
    product_id INTEGER
);

CREATE TABLE customer_inventory(
    product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id),
    product_count INT,
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES product(farmer_id)

);

CREATE TABLE event(
    event_id INTEGER NOT NULL AUTO_INCREMENT,  PRIMARY KEY(event_id),
    event_name VARCHAR(50),
    event_description VARCHAR(50),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)
);

CREATE TABLE product(
    product_id INTEGER NOT NULL AUTO_INCREMENT,  PRIMARY KEY(product_id),
    product_name VARCHAR(50) NOT NULL,
    product_price VARCHAR(50) NOT NULL,
    product_stock INTEGER NOT NULL,
    product_category VARCHAR(50) NOT NULL,
    product_description VARCHAR(50),
    farm_name VARCHAR(50), FOREIGN KEY (farm_name) REFERENCES farmer(farm_name),
    cart_id INTEGER NOT NULL, FOREIGN KEY(cart_id) REFERENCES cart(cart_id)
);