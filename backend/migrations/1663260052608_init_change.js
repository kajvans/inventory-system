module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS \`change\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`change\` VARCHAR(45) NULL DEFAULT NULL,
  \`user\` VARCHAR(45) NULL DEFAULT NULL,
  \`timestamp\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  \`products_name\` VARCHAR(45) NOT NULL,
  PRIMARY KEY (\`id\`, \`products_name\`),
  UNIQUE INDEX \`id_UNIQUE\` (\`id\` ASC),
  INDEX \`fk_change_products1_idx\` (\`products_name\` ASC),
  CONSTRAINT \`fk_change_products1\`
    FOREIGN KEY (\`products_name\`)
    REFERENCES \`products\` (\`name\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;`,
    "down": "DROP TABLE `change`"
}