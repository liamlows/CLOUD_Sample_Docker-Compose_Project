

/*1.2   update password */
UPDATE farmer
SET user_password = '    '
WHERE user_login = '   ';

UPDATE customer
SET user_password = '    '
WHERE user_login = '   ';

UPDATE consumer
SET user_password = '    '
WHERE user_login = '   ';

/*1.3   create account */
INSERT INTO farmer(first_name, last_name, farm_name, farm_description, farm_picture_link, user_login, user_password) VALUES
(' ', ' ', '' ,'','','','');


/*1.6   delete account */
DELETE FROM farmer WHERE user_login = '';
DELETE FROM consumer WHERE user_login = '';
DELETE FROM customer WHERE user_login = '';

/*2.2   add product  */
INSERT INTO product(product_id, product_name, product_price, product_description, farmer_id) VALUE
('','','','','');

/*2.3   edit product */
UPDATE product
SET product_name = ''
WHERE product_id = '';

UPDATE product
SET product_price = ''
WHERE product_id = '';

UPDATE product
SET product_description = ''
WHERE product_id = '';

/*2.4   delete product */
DELETE FROM product WHERE product_id = '';

/*2.5   create sell request  */
INSERT INTO requests(request_id, request_type, product_id, farmer_id) VALUE
('','SELL','','');

/*2.6   view buy request  */
SELECT * FROM requests
WHERE request_type = 'BUY';

/*3.2   BUY request   */
INSERT INTO requests(request_id, request_type, product_id, farmer_id) VALUE
('','BUY','','');

/*3.3   Edit BUY request   */
UPDATE requests
SET product_count = ''
WHERE request_id = '';

UPDATE requests
SET product_id = ''
WHERE request_id = '';

/*3.3   Edit BUY request   */





