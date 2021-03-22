create database if not exists mylibrary;
use mylibrary;
CREATE TABLE if not exists Category (
	id bigint NOT NULL AUTO_INCREMENT UNIQUE,
	category varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);


CREATE TABLE if not exists User  (
	id bigint NOT NULL AUTO_INCREMENT,
	name varchar(255),
	username varchar(255) NOT NULL UNIQUE,
	password TEXT(255) NOT NULL,
	registration_date datetime NOT NULL DEFAULT NOW(),
	category bigint(255) NOT NULL,
	isActive bool NOT NULL default true,
    registered_by bigint ,

	PRIMARY KEY (id),
    FOREIGN KEY (registered_by) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category) REFERENCES Category (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE if not exists Subject (
	id bigint NOT NULL UNIQUE AUTO_INCREMENT,
	subject varchar(200) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE if not exists Book (
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


CREATE TABLE if not exists Records(
	id bigint NOT NULL AUTO_INCREMENT,
	lent_date DATETIME NOT NULL default NOW(),
	due_date DATETIME NOT NULL default (DATE_ADD(NOW(), INTERVAL 1 MONTH)),
	isDueOver bool NOT NULL DEFAULT false,
	isReturned bool NOT NULL DEFAULT false,
	isPaid bool NOT NULL DEFAULT FALSE,
	user bigint NOT NULL,
    librarian bigint NOT NULL,
    last_updated_by bigint not null,
	last_updated_on datetime default NOW(),
	
    PRIMARY KEY (id),
    FOREIGN KEY (last_updated_by) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (librarian) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE if not exists Payment (
	id bigint NOT NULL AUTO_INCREMENT,
	payDate DATETIME NOT NULL DEFAULT NOW(),
	payAmoun bigint,
	record_id bigint NOT NULL,
	payment_accepter bigint NOT NULL,
    last_updated_by bigint NOT NULL,
    last_updated_on datetime default NOW(),
    
	PRIMARY KEY (id),
    FOREIGN KEY (last_updated_by) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_accepter) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (record_id) REFERENCES records (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATE TABLE Pay_info (
-- 	book bigint NOT NULL,
-- 	payment_id bigint NOT NULL,
--     FOREIGN KEY (payment_id) REFERENCES payment (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );



CREATE TABLE if not exists Lent_details (
	id bigint NOT NULL AUTO_INCREMENT,
	record_id bigint NOT NULL,
	book_id bigint NOT NULL,
    
    primary key(id),
    
    FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (record_id) REFERENCES records (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- init values
insert into subject (subject) 
value("Python") ,('Java'),('Node'),('SQL');

insert into category (category) 
value("Librarian") ,('Student'),('Faculty');


-- ------------------------------- --
-- CREATE TABLE test(
-- 	id bigint NOT NULL AUTO_INCREMENT,
-- 	dt DATETIME not null default NOW(),
-- 	due DATETIME NOT NULL default (DATE_ADD(now(), INTERVAL 1 MONTH)),
-- 	isDueOver bool NOT NULL DEFAULT false,
-- 	PRIMARY KEY (id)
--     
-- );



