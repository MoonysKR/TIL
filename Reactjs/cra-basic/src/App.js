// 다른 js 파일을 불러오는 과정 , 임포트 후 사용하지 않으면 에러
// import Btn from "./Button";

// import styles from "./App.module.css";

// useState를 짧게 쓰기 위해 import
// 효율성을 위해 useEffect import
import { useState, useEffect } from "react";

function App() {
  // RCA를 사용하면 state를 만들때
  // useState를 import하고
  // React.useState()가 아니라 그냥 useState()
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log("i run all the time");

  // Effect
  // 첫 렌더링때만 콘솔로그를 찍고 싶다할 떄 있음 , 다음 state가 변경되어도 콘솔하고 싶지 않을 수도
  // 코드가 처음에만 실행되도록 도와줌
  const iRunOnlyOnce = () => {
    console.log("call the api");
  };
  // 두번째 인자값이 비어있으면 볼게 없으니 한번만 실행
  useEffect(iRunOnlyOnce, []);

  // 이대로라면 click을 실행해도 console.log가 실행됨
  const [keyword, setKeyword] = useState("");
  const onChange = (event) => setKeyword(event.target.value);
  // console.log("search for", keyword);

  // keyword가 바뀌는 것을 두번째 인자(deps || dependency)에 입력하면 인식 && 두 개 입력하면 둘 다 볼 수 있음
  // keyword가 바뀌면 console.log 실행
  useEffect(() => {
    // console.log("search for", keyword);
    // 처음 렌더링할 때 실행되기 때문에 조건문으로 구체화
    if (keyword !== "" && keyword.length > 5) {
      console.log("search for", keyword);
    }
  }, [keyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      {/* <h1 className={title}>Welcome back!!!!</h1> */}
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
