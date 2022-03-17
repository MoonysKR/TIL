-- Aggregate functions
-- COUNT() 개수 구하기
-- AVG() 평균 구하기
-- MAX() 최대값
-- users 테이블의 총개수를 조회하기
SELECT COUNT(*) FROM users;

-- 30살 이상의 평균 나이
SELECT AVG(age) FROM users WHERE age >= 30;

-- 잔액이 가장 높은 사람의 이름과 액수
SELECT MAX(balance), first_name FROM users;

-- 나이가 30이상인 사람의 계좌 평균 잔액
SELECT AVG(balance) FROM users WHERE age>=30;