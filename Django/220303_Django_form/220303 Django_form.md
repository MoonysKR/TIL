# HTML Form

- HTML "form" element
  - 웹에서 사용자 정보를 입력하는 여러 방식(txt, btn, checkbox, file, hidden, img, pwd, radio, reset, submit)을 제공하고 사용자로부터 할당된 데이터를 서버로 전송하는 역할을 담당
  - 핵심 속성(attribute)
    - action : 입력 데이터가 전송될 URL 지정
    - method : 입력 데이터 전달 방식 지정
- HTML "input" element
  - 사용자로부터 데이터를 입력받기 위해 사용
  - type 속성에 따라 동작 방식이 달라짐
  - 핵심 속성(atrribute)
    - name
    - 중복가능, 양식을 제출했을 때 name이라는 이름에 설정된 값을 넘겨서 값을 가져올 수 있음
    - 주요 용도는 GET/POST 방식으로 서버에 전달하는 파라미터(name은 key, value는 value)로 매핑하는 것
    - Get방식에서는 URL에서 `?key=value&key=value`

- HTML "label" element
  - 사용자 인터페이스 항목에 대한 설명(caption)을 나타냄
  - label을 input 요소와 연결하기
    - input에 id 속성 부여
    - label에는 input의 id와 동일한 값의 for 속성이 필요
  - label과 input 요소 연결의 주요 이점
    - 시각적인 기능 뿐만 아니라 화면 리더기에서 label을 읽어 사용자가 입력해야 하는 텍스트가 무엇인지 더 쉽게 이해할 수 있도록 돕는 프로그래밍적 이점도 있음
    - label을 클릭해서 input에 초점(focus)를 맞추거나 활성화(activate)시킬 수 있음
- HTML "for" attribute
  - for 속성의 값과 일치하는 id를 가진 문서의 첫번째 요소를 제어
    - 연결된 요소가  labelable elements인 경우 이 요소에 대한 labeled control이 됨
  - "labelable elements"
    - label 요소와 연결할 수 있는 요소
    - button, input(not hidden type), select, textarea
- HTML "id" attribute
  - 전체 문서에서 고유(must be unique)해야하는 식별자를 정의
  - 사용목적
    - linking, scripting, styling 시 요소를 식별
- HTTP
  - HyperText Transfer Protocol
  - 웹에서 이루어지는 모든 데이터 교환의 기초
  - 주어진 리소스가 수행할 작업을 나타내는 request methods를 정의
  - HTTP request method 종류
    - GET, POST, PUT, DELETE
- HTTP request method - "GET"
  - 서버로부터`정보`를 `조회`하는데 사용
  - 데이터를 가져올 때만 사용해야 함
  - 데이터를 서버로 전송할 때 body가 아닌 Query String Parameters를 통해 전송
  - 우리는 서버에 요청을 하면 HTML 문서 파일 한장을 받는데, 이때 사용하는 요청의 바식이 GET

---

# URL

- Django URLSs

  - Dispatcher(발송자, 운항 관리자)로서의 URL
  - 웹애플리케이션은 URL을 통한 클라이언트의 요청에서 부터 시작됨

- Variable Routing

  - URL 주소를 변수로 사용하는 것

  - URL의 일부를 변수로 지정하여 view 함수의 인자로 넘길 수 있음

  - 즉, 변수 값에 따라 하나의 path()에 여러 페이지를 연결 시킬 수 있음

  - (예) 로또 회차별 당첨 페이지(각각의 URL을 만드는게 아니라 회차 정보만 URL내에서 변수화)

  - request인자만을 받아왔는데 추가적으로 변수를 받는 방식

  - ```python
    path('acocounts/user/<int:user_pk>/', ...)
    # 타입을 적고 변수명(view함수에서 request와 인자로 들어감)
    # 들어갈 수 있는 타입 : str, int, slug(하이픈(-)이 들어간 방식)
    ```

- App URL mapping

  - app의 view함수가 많아지면서 사용하는 path() 또한 많아지고,
    - app 또한 더 많이 작성되기 때문에 프로젝트의 urls.py에서 모두 관리하는 것은 프로젝트의 유지보수에 좋지 않음
  - 이제는 `각 app에 urls.py를 작성`하게 됨 
  - pjt폴더의 url은 admin과 각 어플리케이션으로 이동시켜주는 URL 남김
  - import에 include 추가 => 어플리케이션으로 연결해주는 함수
  - django는 `명시적 상대경로` `(from . import ..)`을 권장

---

1. /throw/ url로 요청을 보냄
2. django의 /throw/ urls.py가 throw view함수를 호출 => throw 템플릿을 응답
3. throw 템플릿을 응답 받아서 화면을 볼 수 있음   (여기까지가 Throw페이지를 만들고 호출하는 과정)
4. throw 템플릿에서 form태그를 통해 데이터를 `/catch/`로 submit(제출)  =>데이터를 쓰고 엔터를 누르는 과정



5. django의 /catch/ urls.py가 catch view 함수를 호출
6. catch view 함수는 요청 객체의 데이터를 추출
7. catch view 함수는 추출한 데이터와 함께 catch 템플릿을 응답(렌더링)
8. 클라이언트는 응답받은 catch 템플릿을 보게 됨

---

