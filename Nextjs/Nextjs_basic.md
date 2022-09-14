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
    - 브라우저가 유저가 보는 UI를 만들어줌
    - 브라우저가 자바스크립트로 페이지를 짜주는 형태
    - 소스코드를 보면 하나의 디브밖에 없음
      - 나머지는 모두 자바스크립트
  - 넥스트는  SSR
    - 유저의 속도가 느려도 렌더링 속도는 CSR보다 빠름
    - pre rendering
    - 소스코드에 진짜 HTML이 존재
    - SEO에 좋음
      - 검색엔진 최적화 강점



---

#### Routing

- Next JS는 a태그를 이용하지 않는다.
- 브라우저가 다른 페이지로 보낼 때 그 페이지를 리로딩(f5)하기 때문 -> 느려짐
- Link component 사용
  - 리로딩하지 않기에 속도에서 강점
  - 스타일이나 다른 변수들은 a태그에 적용하면 된다.

```js
// components/NavBar.js

import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  // 현재 페이지의 라우터를 알 수 있음
  // 액티브 등 활용할 때 사용하면 좋음
  const router = useRouter();
  console.log(router);
  return (
    <nav>
      {/* <a href="/">Home</a>
      <a href="/about">About</a> */}
      {/* Next JS는 a태그를 이용하지 않는다. */}
      {/* 브라우저가 다른 페이지를 보내기 위해 모든 페이지를 리로딩하기 때문 */}
      {/* Link component 사용 */}
      {/* 리로딩하지 않기에 속도에서 강점 */}
      {/* 스타일이나 다른 변수들은 a태그에 적용하면 된다. */}
      <Link href="/">
        <a
          className="hello"
          style={{ color: router.pathname === "/" ? "red" : "black" }}
        >
          {" "}
          HOME{" "}
        </a>
      </Link>
      <Link href="/about">
        <a style={{ color: router.pathname === "/about" ? "red" : "black" }}>
          {" "}
          ABOUT{" "}
        </a>
      </Link>
    </nav>
  );
}
```



---

#### CSS Modules

- 스타일을 html 코드에 직접 작성할 수도 있지만 가독성이 떨어지기 때문에 css 파일을 만들어 관리
- 네이밍 규칙
  - {파일명}.module.css

```js
// components/NavBar.js

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

// css 모듈을 사용하면 좋은점
// 스트링 형태로 클래스를 지정하는게 아니라 오브젝트의 객체 형식으로 접근함, 무작위 클래스이름이 적용됨 -> 클래스 이름이 중복될 일이 없음!!

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    // <nav className={styles.nav}>
    <nav>
      <Link href="/">
        <a
          className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}
        >
          {" "}
          HOME{" "}
        </a>
      </Link>
      <Link href="/about">
        <a
          className={`${styles.link} ${
            router.pathname === "/about" ? styles.active : ""
          }`}
        >
          ABOUT
        </a>
      </Link>
    </nav>
  );
}
```

```css
.active {
  color: tomato;
}

.link {
  text-decoration: none;
}
```



---

#### Styles JSX

- next js에서 사용하는 고유한 방식
  - 고유한 클래스명을 부여함으로써 각 컴포넌트가 영향을 받지 않음
- 컴포넌트의 스타일에 영향을 미치지 않음
  - 부모의 스타일이 자손에게 영향을 주지 않음
  - 자손의 스타일이 부모에게 영향을 주지 않음

```js
// index.js

import { useState } from "react";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="active">Hello </h1>
      <style jsx>{`
        a {
          color: white;
        }
      `}</style>
    </div>
  );
}
```

```js
// components/NavBar.js

import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    // <nav className={styles.nav}>
    <nav>
      <Link href="/">
        <a className={router.pathname === "/" ? "active" : ""}>HOME</a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === "/about" ? "active" : ""}>ABOUT</a>
      </Link>
      {/* next js에서 스타일 먹이는 방식 */}
      <style jsx>{`
        nav {
          background-color: tomato;
        }
        a {
          text-decoration: none;
        }
        .active {
          color: yellow;
        }
      `}</style>
    </nav>
  );
}
```



---

#### Custom App

- Global Styles
  - `<style jsx global></style>`
    - 작성한 부모에 있는 컴포넌트들에 적용
    - 다른 부모로 이동하면 없어짐
      - 다 복붙해야하는데 효율이 떨어짐
- 어떤 컴포넌트는 모든 페이지에 보여주고 싶다.
  - App Component 사용 , blue print같은 존재
  - pages에 `_app.js` 생성
    - Next JS는 이 페이지를 가장 먼저 읽어올 것
    - 네이밍 규칙
- `/styles/global.css`
  - 기본적으로 css를 불러와 사용하려면 module 형태로 임포트해야함
  - _app.js에는 global.css를 통해 스타일 적용 가능
    - _app.js는 템플릿이고 커스텀하는 느낌

```js
// _app.js

// 프레임워크가 만든 규칙
// App은 두 인자를 가짐 : Component, pageProps

import NavBar from "../components/NavBar";

// Component에는 NavBar같은 파일이 될 수 있음
export default function App({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <span>Hello</span>
      {/* 이곳에 글로벌 스타일을 적용하면 모든 컴포넌트에 적용 가능 */}
    </div>
  );
}
```

