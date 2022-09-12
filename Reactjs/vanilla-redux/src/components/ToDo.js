import React from "react";

function ToDo(id, text) {
  return (
    <li>
      {text} <button>DEL</button>
    </li>
  );
}

export default ToDo;
