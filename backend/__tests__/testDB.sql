CREATE DATABASE IF NOT EXISTS testDB;

CREATE SCHEMA IF NOT EXISTS `testDB` DEFAULT CHARACTER SET utf8;

USE `testDB`;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(15),
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `lawyer` (
  `lawyer_id` INT AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(15),
  `email` VARCHAR(255),
  `branch_of_law` ENUM('Criminal law', 'Labor law', 'Corporate and commercial law', 'International law', 'Healthcare and medical law'),
  `description` TEXT,
  `rate` ENUM('1', '2', '3', '4', '5'),
  `budget` DECIMAL(10, 2),
  PRIMARY KEY (`lawyer_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `favorites` (
  `favorites_id` INT AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `lawyer_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer`(`lawyer_id`),
  PRIMARY KEY (`favorites_id`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `calendar_events` (
  `event_id` INT AUTO_INCREMENT,
  `lawyer_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `event_date` DATETIME NOT NULL,
  `event_description` TEXT,
  PRIMARY KEY (`event_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer`(`lawyer_id`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `chat_messages` (
  `message_id` INT AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `lawyer_id` INT NOT NULL,
  `message_text` TEXT NOT NULL,
  `sender_type` ENUM('user', 'lawyer') NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer`(`lawyer_id`)
) ENGINE = InnoDB;



DELIMITER $$
CREATE TRIGGER `before_insert_calendar_event` BEFORE INSERT ON `calendar_events` FOR EACH ROW
BEGIN
  IF NEW.event_date < NOW() THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'The event date cannot be later than the current date';
  END IF;
END$$
DELIMITER ;