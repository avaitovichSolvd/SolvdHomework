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

CREATE TABLE IF NOT EXISTS `user_cart` (
  `cart_id` INT AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `lawyer_id` INT NOT NULL,
  FOREIGN KEY (`username`) REFERENCES `user`(`username`),
  FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer`(`id_lawyer`),
  PRIMARY KEY (`cart_id`)
) ENGINE = InnoDB;
