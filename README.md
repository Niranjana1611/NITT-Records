# NITT-Records

INSTALL:

npm init

npm install save express express-session path util mysql dotenv

MYSQL:

CREATE DATABASE IF NOT EXISTS nitt;

USE nitt;

CREATE TABLE nittian ( 
	id int AUTO_INCREMENT PRIMARY KEY,
	rollnumber int NOT NULL UNIQUE KEY,       
	fullname varchar(30) NOT NULL,
	dept char(5) NOT NULL,
	batch int NOT NULL,
	phone double NOT NULL
);
