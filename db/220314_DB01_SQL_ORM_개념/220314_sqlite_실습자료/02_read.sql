-- SQLite
-- rowid 포함 조회
SELECT rowid, * FROM  classmates;

-- id와 name만 조회
SELECT rowid, name FROM classmates;

-- 특정 테이블에서 컬럼값 중 상위 일부만 조회
SELECT rowid, name FROM classmates LIMIT 1;

-- 특정부분에서 원하는 수 만큼 데이터 조회하기
SELECT rowid, name FROM classmates LIMIT 1 OFFSET 2;

-- WHERE : 특정조건 조회하기
SELECT rowid, name FROM classmates WHERE address = 'SEOUL';

-- SELECT DISTINCT : 특정 컬럼을 기준으로 중복없이 가져오기
SELECT DISTINCT age FROM classmates;