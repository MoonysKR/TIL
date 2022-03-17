-- ODER BY
-- 조회 결과 집합을 정력
-- SELECT문에 추가하여 사용
-- 정렬 순서를 위한 두개의 키워드 제공
-- ASC : 오름차순(default)  // 생략 가능
-- DESC : 내림차순

-- users에서 나이 순으로 오름차순 정렬하여 상위 10개만 조회하기
-- 몇 개만 조회하기 ==> LIMIT
SELECT * FROM users ORDER BY age ASC LIMIT 10;

-- 나이 순, 성 순으로 오름차순 정렬하여 상위 100개만 조회한다면?
-- 정렬의 기준을 여러개 주어질 때 앞에부터 정렬
SELECT * FROM users ORDER BY age, last_name ASC LIMIT 100;
-- 나이는 오름차 성은 내림차일 경우
SELECT * FROM users ORDER BY age ASC, last_name DESC LIMIT 100;

-- 계좌 잔액 순으로 내림차순 정렬하여 해당 유저의 성과 이름을 10개만 조회한다면
SELECT last_name, first_name FROM users ORDER BY balance DESC LIMIT 10;