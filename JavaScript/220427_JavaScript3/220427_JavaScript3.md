# DOM 조작과 EVENT

- DOM
- DOM 조작
- DOM 조작 실습
- EVENT
- 마무리

----

### DOM(Document Object Model)

- 브라우저에서 할 수 있는 일
  -  DOM 조작
    - 문서(HTML) 조작
  - BOM 조작
    - navigator, screen, location, frames, history, XHR
  - JavaScript COre (ECMAScript)
    - Data Structure(Object, Array), Conditional Expression, Iteration



- - DOM 이란?

    - HTML, XML과 같은 문서를 다루기 위한 프로그래밍 인터페이스

    - 문서를 구조화하고, 구조화된 구성 요소를 하나의 객체로 취급하여 다루는 논리적 트리 모델

    - 문서가 객체(object)로 구조화되어 있으며 key로 접근 가능

    - 단순한 속성 접근, 메서드 활용 뿐만 아니라 프로그래밍 언어적 특성을 활용한 조작 가능

    - 주요 객체

      - window : DOM을 표현하는 창 (브라우저 탭). 채상위 객체 (작성 시 생략 가능)
      - document : 페이지의 컨텐츠의 Entry Point 역할을 하며, \<head>, \<body> 등과 같은 수많은 다른 요소들을 포함
      - navigator , location , history , screen

      ![image-20220427104145961](220427_JavaScript3.assets/image-20220427104145961.png)

- DOM - 해석

  - 파싱 (Parsing)

    - 구문 분석, 해석
    - 브라우저가 문자열을 해석하여 DOM Tree로 만드는 과정

    ![image-20220427104230143](220427_JavaScript3.assets/image-20220427104230143.png)

    

- DOM - 조작

![image-20220427104255740](220427_JavaScript3.assets/image-20220427104255740.png)



- BOM이란?

  - Browser Object Model

  - 자바스크립트가 브라우저와 소통하기 위한 모델
    - 브라우저의 창이나 프레임을 추상화해서 프로그래밍적으로 제어할 수 있도록 제공하는 수단
      - 버튼, URL 입력창, 타이틀 바 등 브라우저 윈도우 및 웹 페이지 일부분을 제어 가능

  - window 객체는 모든 브라우저로부터 지원받으며 브라우저의 창(window)를 지칭



- BOM 조작

![image-20220427104350424](220427_JavaScript3.assets/image-20220427104350424.png)



- JavaScript Core

  - 프로그래밍 언어

  ![image-20220427104419737](220427_JavaScript3.assets/image-20220427104419737.png)



---

### DOM 조작

- DOM 조작 - 개념
  - Domcument는 문서 한 장(HTML)에 해당하고 이를 조작
  - DOM 조작 순서
    1. 선택 (Select)
    2. 변경 (Maniapulation)



- Document 위치

![image-20220427104545599](220427_JavaScript3.assets/image-20220427104545599.png)



- DOM 관련 객체의 상속 구조

  - EventTarget
    - Event Listener를 가질 수 있는 객체가 구현하는 DOM 인터페이스
  - Node
    - 여러가지 DOM 타입들이 상속하는 인터페이스

  ![image-20220427104652562](220427_JavaScript3.assets/image-20220427104652562.png)

  - Element
    - Document 안의 모든 객체가 상속하는 가장 범용적인 인터페이스
    - 부모인 Node와 그 부모인 EventTarget의 속성을 상속
  - Document
    - 브라우저가 불러온 웹 페이지를 나타냄
    - DOM 트리의 진입점(entry point)역할을 수행
  - HTMLElement
    - 모든 종류의 HTML 요소
    - 부모 element의 속성 상속

  ![image-20220427104834955](220427_JavaScript3.assets/image-20220427104834955.png)



- DOM 선택 - 선택 관련 메서드
  - document.**qurySelector(selector)**
    - 제공한 선택자와 일치하는 element 하나 선택
    - 제공한 CSS selector를 만족하는 첫번째 element 객체를 반환 (없다면 null)
  - document.**querySelectorAll(selector)**
    - 제공한 선택지와 일치하는 여러 element를 선택
    - 매칭 할 하나 이상의 셀렉터를 포함하는 유효한 CSS selector를 인자(문자열)로 받음
    - 지정된 셀렉터에 일치하는 NodeList를 반환
  - getElementById(id)
  - getElementsByTagName(name)
  - getElementByClassName(names)
  - **querySelector( ), querySelectorAll( )을 사용하는 이유**
    - id, class, 그리고 tag 선택자 등을 모두 사용 가능하므로, 더 구체적이고 유연하게 선택 가능
      - ex) document.querySelector( '#id' ), document.querySelectorAll( '.class' )
      - 