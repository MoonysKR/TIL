import { createStore } from "redux";

// action를 불러올 변수명 정의
const ADD = "ADD";
const DELETE = "DELETE";

// action 함수 정의
export const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

// reducer 정의
const reducer = (state = ["hello"], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

// store 생성
const store = createStore(reducer);

// subscription은 각 컴포넌트에서 필요함

export default store;
