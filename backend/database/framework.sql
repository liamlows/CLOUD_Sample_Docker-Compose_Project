-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

DROP TABLE customer_event_interests, farmer, product, transactions, users, cart, event;

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
    farm_name VARCHAR(100),
    farm_description VARCHAR(300),
    farm_image_url VARCHAR(500),
    date_founded DATE,
    owner_id INTEGER NOT NULL, FOREIGN KEY (owner_id) REFERENCES users(user_id)
);
CREATE TABLE transactions(
	transaction_id integer auto_increment, primary key(transaction_id),
    customer_id INTEGER NOT NULL, FOREIGN KEY (customer_id) REFERENCES users(user_id),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id),
    is_complete tinyint(1) NOT NULL DEFAULT FALSE,
    purchaseDate TIMESTAMP,
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
    quantity INTEGER,
    customer_id INTEGER NOT NULL, FOREIGN KEY (customer_id) REFERENCES users(user_id),
    product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE event(
    event_id integer auto_increment, PRIMARY KEY(event_id),
    event_name VARCHAR(100),
    event_description VARCHAR(300),
    event_image_url VARCHAR(500),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id),
    date VARCHAR(50),
    time VARCHAR(50)
);

CREATE TABLE customer_event_interests(
	customer_event_interests_id integer auto_increment, PRIMARY KEY(customer_event_interests_id),
    event_id INTEGER NOT NULL, FOREIGN KEY (event_id) REFERENCES event(event_id),
    customer_id INTEGER NOT NULL, FOREIGN KEY (customer_id) REFERENCES users(user_id)
);

CREATE TABLE product(
    product_id INTEGER NOT NULL AUTO_INCREMENT,  PRIMARY KEY(product_id),
    product_name VARCHAR(100) NOT NULL,
    product_price FLOAT NOT NULL,
    product_stock INTEGER NOT NULL,
    product_category VARCHAR(50) NOT NULL,
    product_description VARCHAR(300),
    product_image_url VARCHAR(500),
    farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)
);

CREATE TABLE transaction_products(
    transaction_products_id INTEGER NOT NULL AUTO_INCREMENT,  PRIMARY KEY(transaction_products_id),
    transaction_id INTEGER NOT NULL, FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
    product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id),
    quantity INTEGER
);

# CREATE TABLE requests(
#     request_id INTEGER NOT NULL AUTO_INCREMENT, PRIMARY KEY (request_id),
#     request_type VARCHAR(50),
#     product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id),
#     product_count INTEGER,
#     farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)
#
# );

# CREATE TABLE customer_inventory(
#     product_id INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES product(product_id),
#     product_count INT,
#     farmer_id INTEGER NOT NULL, FOREIGN KEY (farmer_id) REFERENCES farmer(farmer_id)
#
# );

SELECT * FROM farmer;

INSERT INTO users(email, password, first_name, last_name, isFarmer)
VALUES ('smu@email.edu', 'Password123', 'John', 'Deere', 1),
       ('cool@gmail.com', 'password', 'Mark', 'Fontenot', 0);
INSERT INTO users(email, password, first_name, last_name, isFarmer)
VALUES('email@gmail.com', 'password', 'Brandon', 'Wheeless', 1);

INSERT INTO farmer(farm_name, farm_description, farm_image_url, date_founded, owner_id)
VALUES ('Johns Farm', 'LETS GOOOOO', 'https://st.depositphotos.com/1333205/2857/i/600/depositphotos_28571959-stock-photo-farm-building.jpg', '1999-03-23', 1);
INSERT INTO farmer(farm_name, farm_description, farm_image_url, date_founded, owner_id)
VALUES('Brandons J Farm', 'LETS GOOOOO', 'https://ak-d.tripcdn.com/images/fd/hotelintl/g5/M05/18/AE/CggYsFcvV-aAQS9qAADtKXLk0a0868_Z_550_412_R5_Q70_D.jpg', '1999-03-23', 4);

INSERT INTO event(event_name,event_description, event_image_url,farmer_id,date,time)
VALUES
('Animal Show','All Animals 50% off', 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Grand_Parade_3.jpg', 1,'4/24/22','5:00 PM'),
('Plant Show','Buy one get one 50% off', 'https://phsonline.org/uploads/attachments/ckpjtxtrd8mvji3ra8kf14qby-2021-habitat-mainslider.0.233.2952.1545.full.jpg', 1,'5/1/22','10:00 AM'),
('Dog Show','Tricks and treats', 'https://www.gannett-cdn.com/presto/2020/11/26/USAT/8cba8893-d6c5-4d06-b085-5edf6d4f6c53-NUP_192343_2139.jpg?width=2560', 1,'6/1/22','11:00 AM');

INSERT INTO customer_event_interests(event_id,customer_id)
VALUES
(1,2),
(3, 2);

INSERT INTO transactions(customer_id,farmer_id,product_id,quantity,is_complete,purchaseDate, firstName,lastName,address,city,state,zip,cardName,cardNumber,cardExprDate)
VALUES
(2,1,1,2,1,CURRENT_TIME,'Mark','Fontenot','123 elm stree','dallas','tx','75205','visa','1111222233334444','05/22'),
(2,1,2,1,0,CURRENT_TIME,'Mark','Fontenot','123 elm stree','dallas','tx','75205','visa','1111222233334444','05/22');

INSERT INTO cart(quantity,customer_id,product_id)
VALUES
(2,2, 1),
(1,2, 3);

INSERT INTO product(product_name, product_price, product_stock, product_category, product_description, product_image_url, farmer_id)
VALUES('Apples', 1.00, 20, 'Fruit', 'Apples, now available in red color.', 'https://i5.walmartimages.com/asr/7320e63a-de46-4a16-9b8c-526e15219a12_3.e557c1ad9973e1f76f512b34950243a3.jpeg', 1),
       ('Pears', 2.00, 10, 'Fruit', 'They are peary good!', 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/benefits-of-pears-1296x728-feature.jpg', 1),
       ('4066M Heavy Duty Compact Utility Tractor', 54930.00, 3, 'Heavy Duty Equipment', 'Factory-installed 440R Quick Park™ Loader Mounting System included, Turbocharged diesel engine, eHydrostatic Transmission, Standard mid and rear hydraulics, Category 1 and 2, Three-point hitch', 'https://www.deere.com/assets/images/region-4/products/tractors/utility-tractors/4-family-compact-utility-tractors/4066m-heavy-duty/4066m_heavyduty_4seriestractor_studio_r4f093227_r2_1024x576_large_7c64dcb98d85b7743313560c171cf119fd92fc6a.jpg', 1);

SELECT * FROM users;
SELECT * FROM event;
SELECT * FROM customer_event_interests;
SELECT * FROM product WHERE product_category IN ('Fruit', 'Heavy Duty Equipment');
SELECT * FROM customer_event_interests INNER JOIN event ON event.event_id = customer_event_interests.event_id WHERE customer_id = 2;
SELECT customer_event_interests.event_id, event.event_name,event.event_description, event.event_image_url, event.farmer_id, event.date, event.time FROM customer_event_interests INNER JOIN event ON event.event_id = customer_event_interests.event_id WHERE customer_id = 2;
