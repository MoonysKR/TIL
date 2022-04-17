-- SQLite
INSERT INTO classmates (name, age) VALUES ('HONGGILDONG', 23);

INSERT INTO classmates VALUES ('HONGILDONG', 30, 'SEOUL');

SELECT * FROM classmates;

SELECT rowid, * FROM  classmates;

DROP TABLE classmates;

CREATE TABLE classmates (
  -- PK 속성을 정의할 떄는 INT안되고 반드시 INTEGER로 적용시킬 것!!!
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  -- INT, INTEGER 가능가능!
  age INT NOT NULL,
  address TEXT NOT NULL
);

INSERT INTO classmates (name, age, address)
VALUES ('HONGGILDONG', 30, 'SEOUL');

-- rowid 사용해보기
DROP TABLE classmates;

CREATE TABLE classmates (
  -- PK 속성을 정의할 떄는 INT안되고 반드시 INTEGER로 적용시킬 것!!!
  -- id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  -- INT, INTEGER 가능가능!
  age INT NOT NULL,
  address TEXT NOT NULL
);

-- 여러 명의 데이터를 추가할 경우
INSERT INTO classmates VALUES 
('KIMCHULSOO', 33, 'DAEJON'),
('LEESSAFY', 23, 'SEOUL'),
('PARKSAMSUNG', 29, 'DAEGU'),
('MOONJUNJA', 30, 'GUMI'),
('HONGGILDONG', 30, 'SEOUL');