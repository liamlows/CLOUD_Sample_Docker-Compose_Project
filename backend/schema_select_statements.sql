-- Dummy Insert Statements
INSERT INTO farmer(farmer_id,first_name,last_name,farm_name,farm_description,farm_picture_link,user_login,user_password)
VALUES
('ID1','John','Johnson','Johnson Farm','Cow Farm','google.com','john101','password101'),
('ID2','Jack','Jackson','Jackson Farm','Pig Farm','yahoo.com','jack101','password202'),
('ID3','David','Davidson','Davidson Farm','Sheep Farm','bing.com','david101','password303'),
('ID4','James','Jameson','Jameson Farm','Chicken Farm','gmail.com','james101','password404'),
('ID5','Sam','Samson','Samson Farm','Goat Farm','github.com','sam101','password505');

INSERT INTO consumer(consumer_id, first_name, last_name, user_login, user_password)
VALUES
('ID6','Robin','Robinson','rob101','password606'),
('ID7','Charles','Charleson','charlie101','password707'),
('ID8','Carmela','Cameron','carmela101','password808'),
('ID9','Mike','Michaelson','michael101','password909'),
('ID10','Steve','Stevenson','steve101','password101');

INSERT INTO requests(request_id,request_type,product_id,farmer_id)
VALUES
('REQ1','1 Cow','123','ID1'),
('REQ2','2 Pigs','234','ID2'),
('REQ3','1 Sheep','345','ID3'),
('REQ4','3 Chickens','456','ID4'),
('REQ5','1 Goat','567','ID5'),
('REQ6','1 Cow','123','ID1'),
('REQ7','4 Sheep','345','ID3'),
('REQ8','2 Goats','567','ID5');

INSERT INTO cart(product_id,farmer_id)
VALUES
('123','ID1'),
('234','ID2'),
('345','ID3'),
('456','ID4'),
('567','ID5');

INSERT INTO event(event_id,event_name,event_description,farmer_id)
VALUES
('EVNT1','Cow Sale','50% off cows','ID1'),
('EVNT2','Sheep Sale','Buy 1 get 1 free','ID3'),
('EVNT3','Goat Sale','25% off goats','ID5');

INSERT INTO product(product_id,product_name,product_price,product_description,farmer_id)
VALUES
('123','Cow','500','Grassfed','ID1'),
('234','Pig','400','Organic','ID2'),
('345','Sheep','300','Pasture-raised','ID3'),
('456','Chicken','100','Free roam','ID4'),
('567','Goat','200','Trained','ID5');

-- Select Statements
-- select farmers
SELECT * FROM farmer;
-- how many requests are for farmer 1
SELECT COUNT(*) FROM requests
WHERE farmer_id='ID1';
-- select requests for farmer 1 with farmer details
SELECT requests.request_id, requests.request_type, farmer.farm_name
FROM requests
JOIN farmer ON farmer.farmer_id = requests.farmer_id
WHERE requests.farmer_id = 'ID1';
-- select farmer 1 products
SELECT product.product_name, product.product_description, farmer.farm_name
FROM product
JOIN farmer ON farmer.farmer_id=product.farmer_id
WHERE product.farmer_id='ID1';

SELECT * FROM product;
