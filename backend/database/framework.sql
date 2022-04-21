-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;



-- NEW NEW NEW NEW NEW
-- USER STORY 1
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
-- USER STORY 7
CREATE TABLE transactions(
	transaction_id integer not null auto_increment, primary key(transaction_id),
    customer_id VARCHAR(50),
    farmer_id VARCHAR(50),
    product_id VARCHAR(50),
    quantity integer,
    total_price varchar(50) not null,
    product_name VARCHAR(50) NOT NULL,
    product_price VARCHAR(50) NOT NULL
);
INSERT INTO transactions(customer_id,farmer_id,product_id,quantity,total_price,product_name,product_price)
VALUES
('kirk2@smu.edu','charlie4@smu.edu','123',8,'$30','1 Cow','$123'),
('kirk2@smu.edu','charlie4@smu.edu','234',7,'$30','2 Pigs','$234'),
('kirk2@smu.edu','charlie3@smu.edu','345',6,'$30','1 Sheep','345'),
('kirk2@smu.edu','charlie3@smu.edu','456',5,'$30','3 Chickens','456'),
('kirk1@smu.edu','charlie3@smu.edu','567',4,'$30','1 Goat','567'),
('kirk1@smu.edu','charlie3@smu.edu','678',3,'$30','1 Cow','123'),
('kirk1@smu.edu','charlie4@smu.edu','789',2,'$30','4 Sheep','345'),
('kirk1@smu.edu','charlie4@smu.edu','890',1,'$30','2 Goats','567');
select * from transactions;
drop tables transactions;
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
drop tables event;
drop tables customer_event_interests;
select * from event;
select * from customer_event_interests;
INSERT INTO event(event_name,event_description,farmer_id)
VALUES
('Farm show 1','see animals','charlie3@smu.edu'),
('Farm show 2','see dogs','charlie3@smu.edu'),
('Farm show 3','see cats','charlie4@smu.edu');
INSERT INTO customer_event_interests(event_id,event_name,event_description,farmer_id,customer_id)
VALUES
(1,'Farm show 1','see animals','charlie3@smu.edu','kirk2@smu.edu'),
(2,'Farm show 2','see dogs','charlie3@smu.edu','kirk2@smu.edu'),
(3,'Farm show 3','see cats','charlie4@smu.edu','kirk1@smu.edu');

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
    product_count INTEGER,
    cart_price INTEGER

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