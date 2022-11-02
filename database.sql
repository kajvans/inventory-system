-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema inventory
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema inventory
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventory` DEFAULT CHARACTER SET utf8 ;
USE `inventory` ;

-- -----------------------------------------------------
-- Table `inventory`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `stock` VARCHAR(45) NOT NULL,
  `barcode` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NULL DEFAULT 'none',
  `category` VARCHAR(45) NOT NULL,
  `expire` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `barcode_UNIQUE` (`barcode` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `inventory`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`User` (
  `UserId` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Perms` INT NOT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventory`.`change`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`change` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `products_name` VARCHAR(45) NOT NULL,
  `User_UserId` VARCHAR(45) NOT NULL,
  `detail` VARCHAR(45) NULL,
  `timestamp` TIMESTAMP NULL,
  PRIMARY KEY (`id`, `products_name`, `User_UserId`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_change_products1_idx` (`products_name` ASC),
  INDEX `fk_change_User1_idx` (`User_UserId` ASC),
  CONSTRAINT `fk_change_products1`
    FOREIGN KEY (`products_name`)
    REFERENCES `inventory`.`products` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_change_User1`
    FOREIGN KEY (`User_UserId`)
    REFERENCES `inventory`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `inventory`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `received` VARCHAR(45) NULL DEFAULT NULL,
  `sold` VARCHAR(45) NULL DEFAULT NULL,
  `deleted` VARCHAR(45) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT CURRENT_TIMESTAMP(),
  `products_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `products_name`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_history_products_idx` (`products_name` ASC),
  CONSTRAINT `fk_history_products`
    FOREIGN KEY (`products_name`)
    REFERENCES `inventory`.`products` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `inventory`.`Sale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`Sale` (
  `products_name` VARCHAR(45) NOT NULL,
  `week` INT NOT NULL,
  `condition` INT NULL,
  `new price` INT NULL,
  PRIMARY KEY (`products_name`),
  CONSTRAINT `fk_Sale_products1`
    FOREIGN KEY (`products_name`)
    REFERENCES `inventory`.`products` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
