import Home from "./routes/Home";
import Detail from "./routes/Detail";
// 임포트 하고 사용 , Link는 새로고침 없이 이동시켜줌
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    // 형식
    <Router>
      {/* 라우터 하나씩 렌더링하기 위해 Switch 사용 */}
      <Switch>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
