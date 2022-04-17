CREATE TABLE users (
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT NOT  NULL,
  balance INT NOT NULL
  );

SELECT * FROM users WHERE age >= 30;

SELECT first_name FROM users WHERE age >= 30;

SELECT age, first_name FROM users 
WHERE age >= 30 AND last_name = '김';