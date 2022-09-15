module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS \`history\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`received\` VARCHAR(45) NULL DEFAULT '0',
  \`sold\` VARCHAR(45) NULL DEFAULT '0',
  \`deleted\` VARCHAR(45) NULL DEFAULT '0',
  \`added\` INT(11) NOT NULL DEFAULT 0,
  \`date\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`products_name\` VARCHAR(45) NOT NULL,
  PRIMARY KEY (\`id\`, \`products_name\`),
  UNIQUE INDEX \`id_UNIQUE\` (\`id\` ASC),
  INDEX \`fk_history_products_idx\` (\`products_name\` ASC),
  CONSTRAINT \`fk_history_products\`
    FOREIGN KEY (\`products_name\`)
    REFERENCES \`products\` (\`name\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 38
DEFAULT CHARACTER SET = utf8;`,
    "down": "DROP TABLE `history`"
}