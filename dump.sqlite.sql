-- TABLE
CREATE TABLE `bikes`
(
    `id`           INTEGER PRIMARY KEY AUTOINCREMENT,
    `brand`        VARCHAR(255),
    `model`        VARCHAR(255),
    `displacement` VARCHAR(255),
    `times`        VARCHAR(255),
    `category`     VARCHAR(255),
    `price`        VARCHAR(255),
    `rented`       TINYINT(1) DEFAULT 0,
    `createdAt`    DATETIME NOT NULL,
    `updatedAt`    DATETIME NOT NULL
);
CREATE TABLE sqlite_sequence
(
    name,
    seq
);
CREATE TABLE `Users`
(
    `id`        INTEGER PRIMARY KEY AUTOINCREMENT,
    `username`  VARCHAR(255) NOT NULL,
    `name`      VARCHAR(255) NOT NULL,
    `email`     VARCHAR(255) NOT NULL UNIQUE,
    `number`    VARCHAR(255),
    `password`  VARCHAR(255) NOT NULL,
    `seller`    TINYINT(1)   NOT NULL,
    `createdAt` DATETIME     NOT NULL,
    `updatedAt` DATETIME     NOT NULL
);

-- INDEX

-- TRIGGER

-- VIEW
 
