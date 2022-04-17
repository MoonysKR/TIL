-- 조건을 통해 특정 레코드 수정하기
-- 중복 불가능한(unique)값인 rowid를 기준으로 수정

UPDATE classmates 
SET name='홍길동', address='제주도' 
WHERE rowid=5;

SELECT rowid, * FROM classmates;