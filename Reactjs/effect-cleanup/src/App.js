import { useState, useEffect } from "react";

function Hello() {
  // useEffect(() => {
  //   console.log("created :)");
  // cleanup function
  // destroy 될 때 실행될 함수
  // useEffect에서 함수를 리턴하는 형식
  //   return () => console.log("destroyed :(");
  // }, []);

  function destroyFn() {
    console.log("destroyed");
  }
  function effectFn() {
    console.log("created");
    return destroyFn;
  }
  useEffect(effectFn, []);

  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing((prev) => !prev);
  };
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
