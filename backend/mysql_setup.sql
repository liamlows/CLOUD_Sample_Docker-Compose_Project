-- create database db
CREATE DATABASE IF NOT EXISTS db;

-- use newly create database
USE db;


-- SCHOOL TABLE
CREATE TABLE `db`.`schools` (
    `school_id` SERIAL,
    `school_name` VARCHAR(255) NOT NULL,
    `school_location` VARCHAR(255) NOT NULL,
    `school_logo_url` VARCHAR(511) NOT NULL,
    PRIMARY KEY (`school_id`)
);

-- COURSE METADATA TABLE
CREATE TABLE `db`.`course_metadata` (
    `course_meta_id` SERIAL,
    `school_id` BIGINT UNSIGNED,
    `course_name` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    'professor_id' BIGINT UNSIGNED,
    PRIMARY KEY (`course_meta_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`),
    FOREIGN KEY ('professor_id') REFERENCES accounts('account_id'),
);

-- COURSE TABLE
CREATE TABLE `db`.`courses` (
    `course_id` SERIAL,
    `course_meta_id` BIGINT UNSIGNED,
    `max_seats` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `canceled` BOOLEAN NOT NULL DEFAULT FALSE,
    'week_flags' SMALLINT NOT NULL,
    'start_time' TIME NOT NULL,
    'end_time' TIME NOT NULL,
    PRIMARY KEY (`course_id`),
    FOREIGN KEY (`course_meta_id`) REFERENCES course_metadata(`course_meta_id`)
);

-- ROLES TABLE
CREATE TABLE `db`.`roles` (
    `role_id` SERIAL,
    `role_type` ENUM('student', 'ta', 'professor', 'admin') DEFAULT 'student',
    `course_id` BIGINT UNSIGNED,
    `school_id` BIGINT UNSIGNED,
    PRIMARY KEY (`role_id`),
    FOREIGN KEY (`course_id`) REFERENCES  courses(`course_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`)
);

-- ACCOUNT TABLE
CREATE TABLE `db`.`accounts` (
    `account_id` SERIAL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `school_id` BIGINT UNSIGNED,
    `role_id` BIGINT UNSIGNED NOT NULL,
    `last_logged_in` DATETIME DEFAULT NOW(),
    `logged_in` BOOLEAN NOT NULL DEFAULT 0,
    `offline_mode` BOOLEAN NOT NULL DEFAULT 0,
    `email` VARCHAR(255),
    PRIMARY KEY (`account_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`),
    FOREIGN KEY (`role_id`) REFERENCES roles(`role_id`)
);


CREATE TABLE `db`.`friendships` (
    `friend_a` BIGINT UNSIGNED,
    `friend_b` BIGINT UNSIGNED,
    `friendship_time` DATETIME DEFAULT NOW(),
    PRIMARY KEY (`friend_a`, `friend_b`),
    FOREIGN KEY (`friend_a`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`friend_b`) REFERENCES accounts(`account_id`),

     -- Ensures that friend_a is always less than friend_b so
     -- that we can ensure we don't have duplicate friendships in a different order.
    CHECK(`friend_a` < `friend_b`)
);


CREATE TABLE `db`.`friend_requests` (
    `requester_id` BIGINT UNSIGNED,
    `requested_id` BIGINT UNSIGNED,
    `timestamp` DATETIME DEFAULT NOW(),
    `status` INT DEFAULT -1,
    PRIMARY KEY (`requester_id`, `requested_id`),
    FOREIGN KEY (`requester_id`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`requested_id`) REFERENCES accounts(`account_id`)
);


CREATE TABLE `db`.`announcements` (
    `announcement_id` SERIAL,
    `author_id` BIGINT UNSIGNED,
    `school_id` BIGINT UNSIGNED,
    `timestamp` DATETIME DEFAULT NOW(),
    PRIMARY KEY (`announcement_id`),
    FOREIGN KEY (`author_id`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`)
);



-- ENROLLMENT TABLE
CREATE TABLE `db`.`enrollments` (
    `account_id` BIGINT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`account_id`, `course_id`),
    FOREIGN KEY (`account_id`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`course_id`) REFERENCES courses(`course_id`)
);


-- WAITLIST TABLE
CREATE TABLE `db`.`waitlists` (
    `account_id` BIGINT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,
    `timestamp` DATETIME NOT NULL,
    PRIMARY KEY (`account_id`, `course_id`),
    FOREIGN KEY (`account_id`) REFERENCES  accounts(`account_id`),
    FOREIGN KEY (`course_id`) REFERENCES courses(`course_id`)
);


INSERT INTO `roles`(role_type) VALUES('admin');
