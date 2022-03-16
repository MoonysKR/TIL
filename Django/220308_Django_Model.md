# Django Model

### - model

### - orm

### - migrations

### - database api

### - crud

### - admin

---

1. Model

- 단일한 데이터에 대한 정보를 가짐
  - 사용자가 저장하는 데이터들의 피수적인 필드들과 동작들을 포함
- 저장된 데이터 베이스의 구조(layout)
- Django는 model을 통해 데이터에 접속하고 관리
- 일반적으로 각각의 model은 하나의 데이터베이스 테이블에 매핑됨.
- 데이터베이스(DB)

  - 체계화된 데이터의 모임
- 쿼리(Query)

  - 데이터를 조회하기 위한 명령어
  - 조건에 맞는 데이터를 추출하거나 조작하는 명령어
  -  "Query를 날린다." => DB를 조작한다. DB에 명령어를 보낸다.
- 스키마(Schema)

  - 데이터베이스에서 자료의 구조, 표현방법, 관계등을 정의한 구조(structure)
  - 데이터베이스의 구조와 제약 조건(구조, 표현방법, 관계)에 관련한 전반적인 명세를 기술한 것.
- 테이블(Table)

  - 열(컬럼/필드)와 행(레코드/값)의 모델을 사용해 조직된 데이터 요소들의 집합.
  - SQL 데이터베이스에서는 테이블 관계라고도 한다.
  - 행 - 레코드 or 튜플
    - 테이블의 데이터는 행에 저장된다.
    - `PK(기본키)` - 각 행(레코드)의 고유값으로 primary key로 불린다. 반드시 설정해야하며, 데이터 베이스 관리 및 관계 설정 시 주요하게 활용된다.
  - 열 - 필드 or 속성
    - 각 열에는 고유한 데이터 형식이 지정된다.(INTEGER TEXT NULL 등)
- Model 정리
  - "웹 애플리케이션의 데이터를 `구조화`하고 `조작`하기 위한 도구"



2. ORM(Object Relational Mapping)

- 객체 지향 프로그래밍 언어를 사용하여 호환되지 않는 유형의 시스템간에(Django - SQL)데이터를 변환하는 프로그래밍 기술
- OOP프로그래밍에서 RDBMS을 연동할 때, 데이터베이스와 객체 지향 프로그래밍 언어 간의 호환되지 않는 데이터를 변환하는 프로그래밍 기법
- Django는 내장 Django ORM을 사용함
- 장점
  - SQL을 잘 알지 못해도 DB조작이 가능
  - SQL의 절차적 접근이 아닌 객체 지향적 접근으로 인한 높은 생산성
- 단점
  - ORM만으로 완전한 서비스를 구현하기 어려운 경우가 있음
- **현대 웹 프레임워크의 요점은 웹 개발의 속도를 높이는 것. (`생산성`)**

3. Models.py 작성

```python
from turtle import title
from django.db import models
# models라는 장고의 내장 모듈내에 Model클래스 활용 예정

# Create your models here.
# 앱의 단수 형태로 테이블을 생성
class Article(models.Model):
    # 스키마 작성 (컬럼 = 데이터 타입)
    # 문자열 타입 => CharField(필수인자: max_length=값) / TextField()
    title = models.CharField(max_length=10)
    content = models.TextField()
```

- 각 모델은 django.models.Model 클래스의 서브클래스로 표현됨
  - django.db.models 모듈의 Model 클래스를 상속 받음
- models 모듈을 통해 어떠한 타입의 DB컬럼을 정의할 것인지 정의
  - title과 content은 모델의 필드를 나타냄
  - 각 필드는 클래스 속성으로 지정되어 있으며, 각 속성은 각 데이터베이스에



4. 사용 모델 필드

(공식문서 : 구글에서 django model field 검색)

- CharField(max_length=None, **options)
  - 길이의 제한이 있는 문자열을 넣을 때 사용
  - CharField의 max_length는 필수 인자
  - 필드의 최대길이(문자), 데이터베이스 레벨과 django의 유혀성 검사(값을 검증하는 것)에서 사용
- TextField(**options)
  - 글자의 수가 많을 때 사용
  - max_length 옵션 작성시 자동 양식 필드인 textarea위젯에 반영되지만 모델과 데이터베이스수전에는 적용되지 않음
    - max_length는 CharField에서 사용



5. Migrations

- "Django가 model에 생긴 변화를 반영하는 방법"
- Migration(마이그레이션) 실행 및 DB 스키마를 다루기 위한 몇가지 명령어
  - `makemigrations`(필수명령어)
  - `migrate`(필수명령어)
  - sqlmigrate
  - showmigrations

- Migrations Commands
  - ($ python manage.py) makemigrations
    - model을 `변경`한 것에 기반한 새로운 마이그레이션(like 설계도)을 만들 때 사용
    - `설계도에서 변경(수정, 삭제, 추가)이 생기면 바로 진행`
  - ($ python manage.py) migrate
    - 마이그레이션을 DB에 반영하기 위해 사용
    - 설계도를 실제 DB에 반영하는 과정
    - 모델에서의 변경 사항들과 DB의 스키마가 동기화를 이룸
  - ($ python manage.py) sqlmigrate *articles 0001*
    - 마이그레이션에 대한 SQL구문을 보기 위해 사용
    - 마이그레이션이 SQL문으로 어떻게 해석되어서 동작할지 미리 확인할 수 있음
  - ($ python manage.py) showmigrations
    - 프로젝트 전체의 마이그레이션 상태를 확인하기 위해 사용
    - 마이그레이션 파일들이 migrate됐는지 안됐는지 여부를 확인할 수 있음

- `반드시 기억해야할 3단계`

  1. `models.py`
     - model 변경사항 발생시

  2. `($ python manage.py) makemigrations`
     - migrations 파일 생성

  3. `($ python manage.py) migrate`
     - DB반영(모델과 DB의 동기화)

- DateField(DateTimeField의 부모 클래스, 시간 구조만 빠져있음) 옵션 (시험에 꼭 나옴!!!!)

  - auto_now_add
    - 최초 생성일자
    - Django ORM이 최초 insert(테이블에 데이터 입력)시에만 현재 날짜와 시간으로 갱신(테이블에 어떤 값을 최초로 넣을 때)
  - auto_now
    - 최종 수정 일자
    - Django ORM이 save를 할 때마다 현재 날짜와 시간으로 갱신



6. DB API

- "DB를 조작하기 위한 도구"
- Django가 기본적으로 ORM을 제공함에 따른 것으로 DB를 편하게 조작할 수 있도록 도움
- Model을 만들면 Django는 객체들을 만들고 읽고 수정하고 지울 수 있는 database-abstract API를 자동으로 만듦
- database-abstract API 혹은 database-access API라고도 함
- DB API 구문
  - Making Queries
    - `Article.objects.all()`
    - 구조 : Class name.Manager.QuerySet API
  - Manager
    - Django 모델에 베이스 query 작업이 제공되는 인터페이스
    - 기본적으로 모든 Django 모델 클래스에 objects라는 Manager를 추가
  - QuerySet
    - 데이터베이스로부터 전달받은 객체 목록
    - queryset 안의 객체는 0개, 1개 혹은 여러개일 수 있음
    - 데이터베이스로부터 조회, 필터, 정렬 등을 수행할 수 있음
- Django shell
  - 일반 Python shell을 통해서는 장고 프로젝트 환경에 접근할 수 없음
  - 그래서 장고 프로젝트 설정이 load된 Python shell을 활용해 DB API 구문테스트 진행
  - 기본 Django shell보다 더 많은 기능을 제공하는 shell_plus를 사용해서 진행
    - Django-extensions 라이브러리의 기능 중 하나
  - python -i 
  - pip install ipython -> pip install django-extensions -> settings.py에 앱 등록 후 -> python mange.py shell_plus

7. CRUD

- READ(가장 중요 - 원하는 데이터를 얼마나 잘 뽑아서 보여줄 수 있는가 // 데이터 사이언티스트의 덕목)

  - QuerySet API method를 사용해 다양한 조회를 하는 것이 중요
  - QuerySet API method는 크게 2가지로 분류
    1. Methods that `return new querysets`		// 새로운 쿼리셋을 리턴
    2. Methods that `do not return querysets`        // 리턴하지 않음
  - Article.objects.all()
    - 현재 QuerySet의 복사본을 반환
  - get()        // PK와 같이 하나만 존재하는 조회에서 사용해야함.
    - 주어진 lookup매개변수와 일치하는 객체를 반환
    - 객체를 찾을 수 없으면 DoesNotExist 예외를 발생시키고,        // PK가 범위를 벗어난 경우
    - 둘 이상의 객체를 찾으면 MultipleObjectsReturned 예외를 발생 시킴        // PK가 아니라 다른 변수로 조회해서 여러 객체가 조회될 경우
    - 위와 같은 특징을 가지고 있기 떄문에 primary key(PK)와 같이 고유(unique)성을 보장하는 조회에서 사용해야 함
  - filter()        // 여러 매개변수 조회 가능
    - 주어진 lookup 매개변수와 일치하는 객체를 포함하는 새 QuerySet을 반환
    - 조건이 없을 경우 빈 쿼리셋 리턴
    - 

- CREATE

  - $ python manage.py shell_plus

  - article = Article()		// 인스턴스 생성

  - article.title = 'first'

  - article.save()

  - ---

    article = Article(title='second')

  - article.save()

  - ---

    Article.objects.create(title='third', content='django!!!')		// 욤마는 바로 리턴(create함수에 이미 save()포함)!, 인스턴스 없이 작성

  - ---

    save() method

    - Saving objects
    - 객체를 데이터베이스에 저장함
    - 데이터 생성 시 save()를 호출하기 전에는 객체의 ID값이 무엇인지 알 수 없음
      - ID값은 Django가 아니라 DB에서 계산되기 때문
    - 단순히 모델을 인스턴스화 하는 것은 DB에 영향을 미치지않기 떄문에 반드시 save()가 필요

  - str method

  ```python
  def __str__(self):
      return self.title
  
  # 표준 파이썬 클래스의 매서드인 str()을 정의하여 각각의 object가 사람이 읽을 수 있는 문자열을 반환(return)하도록 할 수 있음
  # 작성 후 반드시 shell_plus를 재시작해야함
  # 스키마(설계도)를 바꾸는 것이 아니기 때문에 추가해도 변화가 감지되지 않음
  ```

- Update        // 난이도 측면에서 가장 어려움
  - 수정과 삭제의 공통점 == 뭐를..?수정하고 삭제할지 결정 => 조회를 먼저 해야함!
    1. 인스턴스에 조회할 내용을 담고    // article = Article.objects.get(pk=1)
    2. 내용을 바꿈    // article.title = 'byebye'
    3. 저장    // article.save()
- Delete        // 가장 간단한 친구
  - 조회하고 삭제 매서드
    1. 인스턴스에 조회할 내용을 담고    // article = Article.objects.get(pk=1)
    2. 삭제    // article.delete()
  - save()랑 역할이 아예 다른것
  - DB는 기본적으로 삭제된 pk에 대해 재활용하지 않음
    - 1을 삭제하면, 2부터 시작!

---

QuerySet API와 클래스 매서드는 다르다!

article.save() etc.. != Article.objects.get(pk=1)

물론 기능적인 측면에서 비슷한 것(save매서드, create api)도 있으나 근본이 다름

---

- Field lookups
  - 조회 시 특정 검색 조건을 지정
  - QuerySet매서드 filter(), exclude()*~~filter의 반대~~*, get()에 대한 키워드 인수로 지정됨
  - 예시
    - Article.objects.filter(pk__gt=2)
    - Article.objects.filter(content__contain='ja')



8. CRUD with views

