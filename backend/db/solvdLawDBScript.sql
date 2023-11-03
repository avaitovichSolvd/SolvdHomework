CREATE SCHEMA IF NOT EXISTS `solvdLawDB` DEFAULT CHARACTER SET utf8;

USE `solvdLawDB`;

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  INDEX `username_index` (`username`),
  PRIMARY KEY (`id_user`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `lawyer` (
  `id_lawyer` INT AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `branch_of_law` ENUM('Criminal law', 'Labor law', 'Corporate and commercial law', 'International law', 'Healthcare and medical law'),
  `description` TEXT,
  `rate` ENUM('1', '2', '3', '4', '5'),
  `budget` DECIMAL(10, 2),
  PRIMARY KEY (`id_lawyer`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `favorites` (
  `cart_id` INT AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `lawyer_id` INT NOT NULL,
  FOREIGN KEY (`username`) REFERENCES `user`(`username`),
  FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer`(`id_lawyer`),
  PRIMARY KEY (`cart_id`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `calendar_events` (
  `event_id` INT AUTO_INCREMENT,
  `id_lawyer` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `event_date` DATETIME NOT NULL,
  `event_description` TEXT,
  PRIMARY KEY (`event_id`),
  FOREIGN KEY (`id_lawyer`) REFERENCES `lawyer`(`id_lawyer`),
  FOREIGN KEY (`username`) REFERENCES `user`(`username`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `chat_messages` (
  `message_id` INT AUTO_INCREMENT,
  `user_chat` VARCHAR(45) NOT NULL,
  `lawyer_chat` INT NOT NULL,
  `message_text` TEXT NOT NULL,
  `sender_type` ENUM('user', 'lawyer') NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  FOREIGN KEY (`user_chat`) REFERENCES `user`(`username`),
  FOREIGN KEY (`lawyer_chat`) REFERENCES `lawyer`(`id_lawyer`)
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