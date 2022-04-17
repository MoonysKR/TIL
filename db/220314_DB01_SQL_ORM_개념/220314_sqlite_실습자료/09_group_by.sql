-- GROUP BY
-- 행 집합에서 요약 행 집합을 만듦
-- SELECT문의 optional 절
-- 선택된 행 글붕르 하나 이상의 열 값으로 요약행으로 만듦
-- [주의] WHERE 절이 포함된 경우 반드시 WHERE 절 뒤에 작성해야 함!!
-- 지정된 기준에 따라 행 세트를 그룹으로 결합
-- 데이터를 요약하는 상황에 주로 사용

-- users에서 각 성(last_name)씨가 몇 명씩 있는지 조회하기
-- AS키워드 => 출력될 떄의 이름 변경 가능
SELECT last_name, COUNT(*) AS name_count FROM users GROUP BY last_name;
-- users에서 성씨 별 잔액 평균
SELECT last_name, AVG(balance) FROM users GROUP BY last_name;
