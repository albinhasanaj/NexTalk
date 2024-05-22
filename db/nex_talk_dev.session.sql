-- @block
CREATE TABLE user (
    id VARCHAR(36) PRIMARY KEY,
    githubId VARCHAR(255) UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255)
);
-- @block
SELECT *
FROM user;
--@block
DROP TABLE user;