-- create database db
CREATE DATABASE IF NOT EXISTS db;

-- use newly create database
USE db;


-- SCHOOL TABLE
CREATE TABLE `db`.`school` (
    `school_id` SERIAL,
    `school_name` VARCHAR(255) NOT NULL,
    `school_location` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`school_id`)
);

-- COURSE METADATA TABLE
CREATE TABLE `db`.`course_metadata` (
    `course_meta_id` SERIAL,
    `school_id` BIGINT UNSIGNED,
    `course_name` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    PRIMARY KEY (`course_meta_id`),
    FOREIGN KEY (`school_id`) REFERENCES school(`school_id`)
);

-- COURSE TABLE
CREATE TABLE `db`.`course` (
    `course_id` SERIAL,
    `course_meta_id` BIGINT UNSIGNED,
    `max_seats` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `canceled` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`course_id`),
    FOREIGN KEY (`course_meta_id`) REFERENCES course_metadata(`course_meta_id`)
);

-- COURSE ROLES TABLE
CREATE TABLE `db`.`course_roles` (
    `role_id` SERIAL,
    `role_type` INT DEFAULT 0,
    `course_id` BIGINT UNSIGNED,
    PRIMARY KEY (`role_id`),
    FOREIGN KEY (`course_id`) REFERENCES  course(`course_id`)
);


-- STUDENT TABLE
CREATE TABLE `db`.`student` (
    `student_id` SERIAL,
    `school_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`student_id`),
    FOREIGN KEY (`school_id`) REFERENCES school(`school_id`)
);

-- ACCOUNT TABLE
CREATE TABLE `db`.`account` (
    `account_id` SERIAL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `student_id` BIGINT UNSIGNED,
    `role_id` BIGINT UNSIGNED,
    `logged_in` BOOLEAN NOT NULL DEFAULT 0,
    `last_logged_in` DATETIME DEFAULT NOW(),
    `school_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`account_id`),
    FOREIGN KEY (`student_id`) REFERENCES student(`student_id`),
    FOREIGN KEY (`role_id`) REFERENCES course_roles(`role_id`),
    FOREIGN KEY (`school_id`) REFERENCES school(`school_id`)
);



-- STUDENT ENROLLMENT TABLE
CREATE TABLE `db`.`student_enrollment` (
    `student_id` BIGINT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`student_id`, `course_id`),
    FOREIGN KEY (`student_id`) REFERENCES student(`student_id`),
    FOREIGN KEY (`course_id`) REFERENCES course(`course_id`)
);


-- WAITLIST TABLE
CREATE TABLE `db`.`waitlist` (
    `student_id` BIGINT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,
    `timestamp` DATETIME NOT NULL,
    PRIMARY KEY (`student_id`, `course_id`),
    FOREIGN KEY (`student_id`) REFERENCES  student(`student_id`),
    FOREIGN KEY (`course_id`) REFERENCES course(`course_id`)
);

