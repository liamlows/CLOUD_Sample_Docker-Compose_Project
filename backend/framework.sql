-- create database db
CREATE DATABASE lab;

-- use newly create database
USE db;



/*------------------------USERS PARTIES----------------------------*/

CREATE TABLE farmer (
    farmer_id VARCHAR(50),  PRIMARY KEY(farmer_id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    /*--website VARCHAR(50)*/
    farm_name VARCHAR(50),
    farm_description VARCHAR(50),
    farm_picture_link VARCHAR(50),

    user_login VARCHAR(50),
    user_password VARCHAR(50)

);

CREATE TABLE consumer(
    consumer_id VARCHAR(50),  PRIMARY KEY(consumer_id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),

    user_login VARCHAR(50),
    user_password VARCHAR(50)
);

CREATE TABLE customer(
    customer_id VARCHAR(50),  PRIMARY KEY(customer_id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),

    user_login VARCHAR(50),
    user_password VARCHAR(50)
);


/*------------------------APP CAPABILITIES----------------------------*/

CREATE TABLE requests(
    request_id VARCHAR(50),
    request_type VARCHAR(50),
    product_id VARCHAR(50), FOREIGN KEY (product_id) REFERENCES product(product_id),
    farmer_id VARCHAR(50), FOREIGN KEY (farmer_id) REFERENCES product(farmer_id)

);

CREATE TABLE cart(
    product_id VARCHAR(50), FOREIGN KEY (product_id) REFERENCES product(product_id),
    farmer_id VARCHAR(50), FOREIGN KEY (farmer_id) REFERENCES product(farmer_id)

);

CREATE TABLE event(
    event_id VARCHAR(50),  PRIMARY KEY(event_id),
    event_name VARCHAR(50),
    event_description VARCHAR(50),
    farmer_id VARCHAR(50), FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)
);

CREATE TABLE product(
    product_id VARCHAR(50),  PRIMARY KEY(product_id),
    product_name VARCHAR(50),
    product_price VARCHAR(50),
    product_description VARCHAR(50),
    farmer_id VARCHAR(50), FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id),
    farm_name VARCHAR(50), FOREIGN KEY (farm_name) REFERENCES farmer(farm_name)
);