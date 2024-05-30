-- @block
CREATE TABLE user (
    id VARCHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci PRIMARY KEY,
    githubId VARCHAR(255) UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    profilePic VARCHAR(255)
);
-- @block
SELECT *
FROM user;
--@block
CREATE TABLE friendship (
    user1_id VARCHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    user2_id VARCHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user1_id, user2_id),
    CONSTRAINT fk_user1 FOREIGN KEY (user1_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_user2 FOREIGN KEY (user2_id) REFERENCES user(id) ON DELETE CASCADE
);