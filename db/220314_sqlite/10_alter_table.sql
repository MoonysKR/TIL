-- [복습]title과 content라는 컬럼을 가진 articles라는 이름의 table 만들기
CREATE TABLE articles (
  title TEXT NOT NULL,
  content TEXT NOT NULL
  );
-- title에는 '1번제목' content에는 '1번내용' 추가
INSERT INTO articles VALUES('1번제목', '1번내용');



-- ALTER TABLE 문의 4가지 기능

-- table 이름 변경
-- ALTER TABLE table_name TO new_name_talbe;

-- table에 새로운 column 추가
-- ALTER TABLE table_name ADD COLUMN new_column_n ame data_type (NOT NULL);

-- column 이름변경(3.25버전에서 등장)
-- ALTER TABLE table_name RENAME COLUMN current_name TO new_name;

-- column 제거(3.35버전에서 등장)
-- ALTER TABLE table_name DROP COLUMN column_name;



-- articles 테이블 이름을 news로 바꾸기
ALTER TABLE articles RENAME TO news;

-- 새로운 컬럼 추가
ALTER TABLE news ADD COLUMN created_at TEXT NOT NULL;
-- ** 오류 발생 **
-- 1. NOT NULL 없이 추가하기
ALTER TABLE news ADD COLUMN created_at TEXT;
INSERT INTO news VALUES ('제목', '내용', datetime('now'));
-- 2. default값을 넣어 컬럼 추가
ALTER TABLE news ADD COLUMN subtitle TEXT NOT NULL DEFAULT '소제목';

-- 컬럼 이름 바꾸기
ALTER TABLE news RENAME COLUMN title TO main_title;

-- 컬럼 삭제하기
ALTER TABLE news DROP COLUMN subtitle;