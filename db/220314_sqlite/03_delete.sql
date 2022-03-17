-- rowid를 기준으로 삭제
DELETE FROM classmates WHERE rowid=5;

-- 지워진 아이디는 어떻게 될까? 새로운 데이터 추가해보기
INSERT INTO classmates VALUES ('최전자', 28, '부산');

-- rowid와 전체 데이터 조회
SELECT rowid, * FROM classmates;

-- SQLite는 다음 행이 비어있다면 재활용하도록 설정
-- 재활용하지 않는다면 설정 필요
-- PRIMARY KEY AUTOINCREMENT