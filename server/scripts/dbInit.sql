-- Delete all existing tables in correct order before re-creating them

DROP TABLE IF EXISTS Users;






-- Create tables

CREATE TABLE users(
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE, -- Every username have to be unique, this will be a username
    password CHAR(64) NOT NULL, -- Hash with a fixed length of 64 characters (256 bits)
    salt CHAR(16) NOT NULL UNIQUE -- All salt values has to be unique, and this is an optimal length for our usage
);





-- INIT Admin user
INSERT INTO users (username, password, salt)
VALUES ("admin", "af92f3b32908ce93c5497dfb49a7320d29d3e86a9c83fc7e92eb11e6398116a6", "61d450bcc2601860");

