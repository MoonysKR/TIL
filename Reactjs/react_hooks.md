# React Hooks



[toc]

---

### Introduction



---

### USEEFFECT

- useTitle

  ```js
  import React, { useState, useEffect } from "react";
  import ReactDOM from "react-dom";
  
  const useTitle = (inintialTitle) => {
    const [title, setTitle] = useState(inintialTitle);
    const updateTitle = () => {
      const htmlTitle = document.querySelector("title");
      htmlTitle.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
  };
  
  const App = () => {
    const titleUpdater = useTitle("Loading...");
    setTimeout(() => titleUpdater("home"), 5000);
    return (
      <div className="App">
        <div>HI</div>
      </div>
    );
  };
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
  ```

  
