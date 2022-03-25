CREATE TABLE User (
    username VARCHAR(30) PRIMARY KEY,
    password VARCHAR(30),
    email VARCHAR(30),
    phone VARCHAR(30),
    image VARCHAR(50)
);

CREATE TABLE Land (
    ID SERIAL PRIMARY KEY,
    Acres INT,
    is_available BOOLEAN,
    owner VARCHAR(30),
    description VARCHAR(30),
    coord_lat FLOAT,
    coord_long FLOAT,
    suitable_for VARCHAR(30),
    starting_bid INT,
    image VARCHAR(50)
);

CREATE TABLE Contract (
    ID SERIAL PRIMARY KEY,
    land_id INT,
    owner VARCHAR(30),
    renter VARCHAR(30),
    start DATE,
    end DATE
);


CREATE TABLE Bid (
    ID SERIAL PRIMARY KEY,
    land_id INT,
    owner VARCHAR(30),
    top_bid INT,
    top_bidder VARCHAR(30)
);

CREATE TABLE Review (
    ID SERIAL PRIMARY KEY,
    land_id INT,
    review VARCHAR(30),
    rating INT,
    contents VARCHAR(200)
);