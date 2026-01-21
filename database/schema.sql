CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password TEXT,
  role VARCHAR(20)
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  price NUMERIC,
  area VARCHAR(50)
);
