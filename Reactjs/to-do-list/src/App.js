import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(toDo);
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    // 이거는 왜 안되지??
    // setToDos((currentArray) => currentArray.push(toDo));
    setToDo("");
  };
  return (
    <div>
      <h1>My To Dos : {toDos.length}</h1>
      <form action="" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write ur to do..."
        ></input>
        <button>Add To Do</button>
      </form>
      <hr />
      {/* map은 자바스크립트 함수
      리스트를 가지고 있을 때 각각의 값들을 바꿔주는 것
      인자로 수정 함수를 받음
      모든 값들을 한번씩 받기 때문에 모두 변형 가능
      */}
      {toDos.map((toDo, index) => (
        <li key={index}>{toDo}</li>
      ))}
    </div>
  );
}

export default App;
