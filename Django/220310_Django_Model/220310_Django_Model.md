1. CRUD with views

- GET
  - 특정 리소스를 가져오도록 요청할 때 사용
  - 반드시 데이터를 가져올 때만 사용해야 함
  - DB에 변화를 주지 않음
  - CRUD에서 R 역할을 담당
  - GET을 이용하여 조작을 사용하면 일반 사용자나 악성사용자에게 데이터가 노출 될 수 있음 => POST를 이용할 수 있음
  
- POST
  - 서버로 데이터를 전송할 때 사용
  - 리소스를 생성/변경하기 위해 데이터를 HTTP body에 담아 전송
  - 서버에 변경사항을 만듦
  - CRUD에서 C/U/D 역할을 담당
  
- 사이트 간 요청 위조 (Cross-site request forgery, CSRF)
  - 웹 애플리케이션 취약점 중 하나로 사용자가 자신의 의지와 무관하게 공격자가 의도한 행동을 하여 특정 웹페이지를 보안에 취얗가헤 하거나 수정, 삭제 등의 작업을 하게 만드는 공격 방법
  - Django는 CSRF에 대항하여 middleware와 template tag를 제공
  - 은행에서 가장 많이 사용(위조사이트를 만들어서 개인 정보 탈취, 혹은 이를 이용한 공격)
  
- CSRF 공격 방어
  - Security Token 사용방식(CSRF Token)
    - 사용자의 데이터에 임의의 난수 값을 부여해, 매 요청마다 해당 난수 값을 포함시켜 전송 시키도록 함
    - 이후 서버에서 요청을 받을 때마다 전달된 token값이 유효한지 검증
  - 일반적으로 데이터 변경이 가능한 POST, PATCH, DELETE Method 등에 적용(GET 제외)
  - Django는 CSRF token 탬플릿 태그를 제공

- csrf_token template tag
  - {% csrf_token %}
  - CSRF 보호에 사용
  - input type이 hidden으로 작성되며 value는 Django에서 생성한 hash값으로 설정됨
  - 해당태그 없이 요청을 보낸다면 Django 서버는 403 forbidden을 응답

- CsrfViewMiddleware
  - CSRF 공격 관련 보안 설정은 settings.py에서 MIDDLEWARE에 작성되어 있음
  - 실제로 요청 과정에서 urls.py이전에 Middleware의 설정사항을 순차적으로 거치며 응답은 반대로 하단에서 상단으로 미들웨어를 적용시킴
  
- [참고] Middleware
  - 공통 서비스 및 기능을 애플리케이션에 제공하는 소프트웨어
  - 데이터 관리, 애플리케이션 서비스, 메시징, 인증 및 API관리를 주로 미들웨어를 통해 처리
  - 개발자들이 애플리케이션을 보다 효율적으로 구축할 수 있도록 지원하며, 애플리케이션, 데이터 및 사용자 사이를 연결하는 요소처럼 작동
  
- Django shortcut function - "redirect()"

  - 새 URL로 요청을 다시 보냄
  - 인자에 따라 Http RespnseRedirect를 반환
  - 브라우저는 현재 경로에 따라 전체 URL 자체를 재구성(reconstruct)
  - 사용가능한 인자

  1. model
  2. <u>view name</u> : viewname can be **URL patter name** or callable **view object**
  3. absolute or relative URL

2. Admin Site
   - Automatic admin interface
     - 사용자가 아닌 서버의 관리자가 활용하기 위한 페이지
     - Model class를  admin.py에 등록하고 관리
     - django.contrib.auth 모듈에서 제공됨
     - record 생성여부 확인에 매우 유용하며, 직접 record를 삽입할 수도 있음
   - admin 생성
     - $ python manage.py createssuperuser
     - 관리자 계정 생성 후 서버를 실행한 다음 '/admin'으로 가서 관리자 페이지 로그인
       - 계정만 만든 경우 Django 관리자 화면에서 아무것도 보이지 않음
     - 내가 만든 Model을 보기 위해서는 admin.py에 작성하여 Django 서버에 등록
     - [주의] auth에 관련된 기본 테이블이 생성도지 않으면 관리자 계저을 생성할 수 없음
   - admin 등록
     - admin.py는 관리자 사이트에 모델에 있는 클래스 객체가 관리자 인터페이스를 가지고 있다는 것응ㄹ 알려주는 것
     - models.py에 정의한 \_\_str__ 형태로 객체가 표현됨
   - ModelAdmin options
     - list_display
       - models.py 정의한 각각의 속성(컬럼)들의 값(레코드)을 admin 페이지에 출력하도록 설정
     - list_filter, list_diplay_links 등 다양한 ModelAdmin options 참고
     - https://docs.Djangoproject.com/em/3.2/ref/contrib/admin/#modeladmin-options