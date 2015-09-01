CREATE DATABASE IF NOT EXISTS `stractdev`;

CREATE USER 'stractsimdev'@'localhost' IDENTIFIED BY 'stractsimdev';
GRANT ALL PRIVILEGES ON stractdev.* TO 'stractsimdev'@'localhost';
FLUSH PRIVILEGES;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(100) NOT NULL,
  `LastName` VARCHAR(100) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `PassHash` VARCHAR(1000) NOT NULL,
  `Salt` VARCHAR(1000) NOT NULL,
  `LastLogin` TIMESTAMP,
  PRIMARY KEY(`ID`)
);

INSERT INTO `User` VALUES(NULL, 'Dev', 'Jones', 'stractsimdev@gmail.com', '$2a$10$I3bYZPCF6akaxseA2ovZ4OcLtrsihLxyu8nuirjjJYXuM8zAZsotq', '$2a$10$I3bYZPCF6akaxseA2ovZ4O', CURRENT_TIMESTAMP);
-- stractsimdev:stractsimdev

DROP TABLE IF EXISTS `Company`;
CREATE TABLE `Company` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL,
  `Country_Name` VARCHAR(100) NOT NULL,
  `User` BIGINT NOT NULL,
  `CreatedOn` TIMESTAMP,
  PRIMARY KEY(`ID`)
);

INSERT INTO `Company` VALUES(NULL, 'Stract Shipping Co', 'US', 1, CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS `TaxRates`;
CREATE TABLE TaxRates (
  Country_Name VARCHAR(100) NOT NULL,
  TaxRate DECIMAL(18, 2) NOT NULL
);

LOAD DATA LOCAL INFILE 'tax-rates.txt' INTO TABLE `TaxRates`;

DROP TABLE IF EXISTS `Commodities`;
CREATE TABLE Commodities (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Reference VARCHAR(100)
);

DROP TABLE IF EXISTS `CountryExports`;
CREATE TABLE CountryExports (
  Country_Name VARCHAR(100) NOT NULL,
  Commodity_Name VARCHAR(100) NOT NULL,
  Value DECIMAL(18, 2) NOT NULL,
  Year INT NOT NULL
);

CREATE TABLE CountryImports (
  Country_Name VARCHAR(100) NOT NULL,
  Commodity_Name VARCHAR(100) NOT NULL,
  Value DECIMAL(18, 2) NOT NULL,
  Year INT NOT NULL
);

CREATE TABLE Company_Funds (
  Company INT NOT NULL,
  Funds DECIMAL(10, 8),
  LastUpdated TIMESTAMP
);

CREATE TABLE Ports (
  Name VARCHAR(100),
  ID INTEGER,
  Code VARCHAR(20),
  Country VARCHAR(100),
  Longitude DECIMAL(10, 8),
  Latitude DECIMAL(10, 8),
  Timezone TIME
);

CREATE TABLE Risks (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  CreatedOn TIMESTAMP
);

INSERT INTO Risk VALUES(NULL, 'Pirates', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Bribery', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Theft', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Terrorism', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Strike', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Run Aground Due to Weather.Bad Navigation', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Engine Failure');
INSERT INTO Risk VALUES(NULL, 'Smuggling', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Fire', CURRENT_TIMESTAMP);
INSERT INTO Risk VALUES(NULL, 'Computer System Failure', CURRENT_TIMESTAMP);

CREATE TABLE Ship (
  Name VARCHAR(100),
  Country VARCHAR(100),
  Type VARCHAR(20),
  Length DECIMAL(18, 2),
  Breadth DECIMAL(18, 2),
  DeadWeight DECIMAL(18, 2),
  TopSpeed DECIMAL(18, 2),
  YearBuilt INT,
  CallSign VARCHAR(20)
);

CREATE TABLE Ship_Position (
  ship_name VARCHAR(100),
  ais_source VARCHAR(20),
  status VARCHAR(100),
  destination VARCHAR(100),
  eta DATETIME,
);

CREATE TABLE Ship_Port (
  port_name VARCHAR(100),
  ship_name VARCHAR(100),
  lastUpdated DATETIME
);

