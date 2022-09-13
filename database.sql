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
-- Table `inventory`.`change`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`change` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `change` VARCHAR(45) NULL DEFAULT NULL,
  `user` VARCHAR(45) NULL DEFAULT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `products_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `products_name`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_change_products1_idx` (`products_name` ASC),
  CONSTRAINT `fk_change_products1`
    FOREIGN KEY (`products_name`)
    REFERENCES `inventory`.`products` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `inventory`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory`.`history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `received` VARCHAR(45) NULL DEFAULT '0',
  `sold` VARCHAR(45) NULL DEFAULT '0',
  `deleted` VARCHAR(45) NULL DEFAULT '0',
  `added` INT(11) NOT NULL DEFAULT 0,
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
AUTO_INCREMENT = 38
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
