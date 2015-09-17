CREATE DATABASE stract;

CREATE USER stractsim WITH PASSWORD 'stractsim';
GRANT ALL PRIVILEGES ON DATABASE stract TO stractsim;

DROP TABLE IF EXISTS StractUser;
CREATE TABLE StractUser (
  ID bigserial PRIMARY KEY,
  FirstName varchar(100) NOT NULL,
  LastName varchar(100) NOT NULL,
  Email varchar(100) NOT NULL,
  PassHash varchar(1000) NOT NULL,
  Salt varchar(1000) NOT NULL,
  IsVerified smallint NOT NULL DEFAULT 0,
  LastLogin timestamp
);

INSERT INTO StractUser (FirstName, LastName, Email, PassHash, Salt, IsVerified, LastLogin) VALUES('Sam', 'Jones', 'defaultUser@stractsim.com', '$2a$06$ZiviZYvrfND2TCo87Fk7muzx5lHNh9AdvmC0xqxt6PGwFDM4Z8uSi', '$2a$06$ZiviZYvrfND2TCo87Fk7mu', 1, CURRENT_TIMESTAMP);
-- stractsim:stractsim

DROP TABLE IF EXISTS Profile;
CREATE TABLE Profile (
  Email varchar(100) PRIMARY KEY
);

DROP TABLE IF EXISTS Company;
CREATE TABLE Company (
  ID bigserial PRIMARY KEY,
  Name varchar(100) NOT NULL,
  Country_Name varchar(100) NOT NULL,
  User bigint NOT NULL,
  CreatedOn timestamp
);

INSERT INTO Company VALUES(NULL, 'Stract Shipping Co', 'US', 1, CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS TaxRates;
CREATE TABLE TaxRates (
  Country_Name varchar(100) NOT NULL,
  TaxRate DECIMAL(18, 2) NOT NULL
);

LOAD DATA LOCAL INFILE 'tax-rates.txt' INTO TABLE TaxRates;

DROP TABLE IF EXISTS Commodities;
CREATE TABLE Commodities (
  ID bigserial PRIMARY KEY,
  Name varchar(100) NOT NULL,
  Reference varchar(100)
);

DROP TABLE IF EXISTS CountryExports;
CREATE TABLE CountryExports (
  Country_Name varchar(100) NOT NULL,
  Commodity_Name varchar(100) NOT NULL,
  Value DECIMAL(18, 2) NOT NULL,
  Year int NOT NULL
);

CREATE TABLE CountryImports (
  Country_Name varchar(100) NOT NULL,
  Commodity_Name varchar(100) NOT NULL,
  Value DECIMAL(18, 2) NOT NULL,
  Year int NOT NULL
);

CREATE TABLE Company_Funds (
  Company int NOT NULL,
  Funds DECIMAL(10, 8),
  LastUpdated timestamp
);

CREATE TABLE Ports (
  Name varchar(100),
  ID int,
  Code varchar(20),
  Country varchar(100),
  Longitude DECIMAL(10, 8),
  Latitude DECIMAL(10, 8),
  Timezone time
);

CREATE TABLE Risks (
  ID bigserial PRIMARY KEY,
  Name varchar(100) NOT NULL,
  CreatedOn timestamp
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

