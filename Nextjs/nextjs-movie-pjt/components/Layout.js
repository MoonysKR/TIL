import NavBar from "./NavBar";

// children, react.js가 제공하는 prop
// 컴포넌트 안에 컴포넌트를 넣고 싶을 떄 사용
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
