// 프레임워크가 만든 규칙
// App은 두 인자를 가짐 : Component, pageProps

import NavBar from "../components/NavBar";

// Component에는 NavBarr같은 파일이 될 수 있음
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
