CREATE TABLE quotes (
    id VARCHAR(255) PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255)
);

-- Allows for default connection method from mysql npm package
ALTER USER 'root' IDENTIFIED WITH 'mysql_native_password' BY 'rootpassword';
FLUSH PRIVILEGES;
