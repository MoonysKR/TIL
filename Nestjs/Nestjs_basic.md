# Next.JS

[toc]

---

### FRAMEWORK OVERVIEW

#### library vs Framework

-  라이브러리는 개발자로서 우리가 사용하는 것

  - 라이브러리를 사용해서 무언가 진행

  - reactjs
    - 내가 맘대로 사용하면 된다

- 프레임 워크

  - 내 코드를 불러오는 것
  - nextjs
    - 특정 규칙을 따라, 특정한 것을 해야한다

- 예시)
  - 리액트는 렌더 돔 같은 명령어들이 실행되고 있느것을 확인하고 수정할 수 있지만
  - 넥스트는 깊이 숨겨져있고 수정하기 어렵다.
    - 내 코드는 게스트인 느낌
    - 예시) pages에 about.js를 만들면 라우터는 /about이 되어버림... 수정하기 어려움



---

#### Pages

- 규칙
  - 페이지 추가는 리액트에서 실행하고자 하는 component를 export하는 파일을 pages에 놓으면 됨
  - 네이밍 규칙
    - 파일의 이름 == url
    - 파일의 이름과 컴포넌트의 이름은 동일할 필요 없음
  - 404 페이지를 자동으로 생성
  - `예외 사항들`
    - index
      - home으로 연결됨 url도 /로 끝남
    - jsx를 사용한다면  react를 import할 필요가 없음
      - js 파일도 jsx로 인식해줌
      - useState, useEffect 등 다른 것들은 import해야 함



---

#### Static Pre Rendering

- react와 nextjs의 차이점
  - 리액트는 CSR
  - 넥스트는  SSR