module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(45) NOT NULL,
  \`price\` VARCHAR(45) NOT NULL,
  \`stock\` VARCHAR(45) NOT NULL,
  \`barcode\` VARCHAR(45) NOT NULL,
  \`location\` VARCHAR(45) NULL DEFAULT 'none',
  \`category\` VARCHAR(45) NOT NULL,
  \`expire\` DATE NULL DEFAULT NULL,
  PRIMARY KEY (\`name\`),
  UNIQUE INDEX \`id_UNIQUE\` (\`id\` ASC),
  UNIQUE INDEX \`name_UNIQUE\` (\`name\` ASC),
  UNIQUE INDEX \`barcode_UNIQUE\` (\`barcode\` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;`,
    "down": "DROP TABLE `products`"
}