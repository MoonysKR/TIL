import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToDo from "../components/ToDo";
import { addToDo } from "../store";

function Home() {
  // console.log(porps);
  const [text, setText] = useState("");

  // store의 state
  // useSelector는 getState랑 똑같은 기능(store에서 정보를 가져옴)이고 리액트에서는 mapStateToProps 대체입니다.
  const toDos = useSelector((state) => state);

  // useDispatch는 mapDispatchToProps 대체입니다.
  // store로 dispatch할 때 쓰임
  // 이 훅은 Redux store에서 dispatch 함수에 대한 참조를 반환합니다. (mapDispatchToProps대신 사용 가능)
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(text);
    setText("");
    dispatch(addToDo(text));
    // props를 받아왔기 때문에 조작할 힘이 생겼다.
  };

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
