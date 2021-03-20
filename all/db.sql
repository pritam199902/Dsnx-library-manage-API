create database if not exists mylibrary;
CREATE TABLE User  (
	id bigint NOT NULL AUTO_INCREMENT,
	name varchar(255),
	username varchar(255) NOT NULL UNIQUE,
	password TEXT(255) NOT NULL,
	registration_date datetime NOT NULL DEFAULT NOW(),
	category bigint(255) NOT NULL,
	isActive bool NOT NULL default true,
	PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES Category (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Category (
	id bigint NOT NULL AUTO_INCREMENT UNIQUE,
	category varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE Subject (
	id bigint NOT NULL UNIQUE AUTO_INCREMENT,
	subject varchar(200) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Book (
	id bigint NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	isbn bigint(13) NOT NULL UNIQUE,
	copies_available bigint NOT NULL default 0,
	total_lent bigint NOT NULL default 0,
	author varchar(255),
	publisher varchar(255),
	registration_date datetime NOT NULL DEFAULT now(),
	isActive bool NOT NULL  DEFAULT true,
	subject bigint(255) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (subject) REFERENCES Subject (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Payment (
	id bigint NOT NULL AUTO_INCREMENT,
	payDate DATETIME NOT NULL DEFAULT NOW(),
	payAmoun bigint,
	record_id bigint NOT NULL,
	user bigint NOT NULL,
	PRIMARY KEY (id),
    
    FOREIGN KEY (user) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (record_id) REFERENCES records (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Pay_info (
	book bigint NOT NULL,
	payment_id bigint NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payment (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Records(
	id bigint NOT NULL AUTO_INCREMENT,
	lent_date DATETIME NOT NULL default NOW(),
	due_date DATETIME NOT NULL default (DATE_ADD(NOW(), INTERVAL 1 MONTH)),
	isDueOver bool NOT NULL DEFAULT false,
	isReturned bool NOT NULL DEFAULT false,
	isPaid bool NOT NULL DEFAULT FALSE,
	user bigint NOT NULL,
	PRIMARY KEY (id),
    
    FOREIGN KEY (user) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Lent_details (
	record_id bigint NOT NULL,
	book_id bigint NOT NULL,
    
    FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (record_id) REFERENCES records (id) ON DELETE CASCADE ON UPDATE CASCADE
);




-- ------------------------------- --
CREATE TABLE test(
	id bigint NOT NULL AUTO_INCREMENT,
	dt DATETIME not null default NOW(),
	due DATETIME NOT NULL default (DATE_ADD(now(), INTERVAL 1 MONTH)),
	isDueOver bool NOT NULL DEFAULT false,
	PRIMARY KEY (id)
    
);



