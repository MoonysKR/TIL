import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  // 어떤 값을 보고 그 값이 바뀔 때만 실행 || 두번째 인자가 없다면 처음에 렌더링될 때만 실행
  // fetch => 요청을 보내는 함수
  // response.json() json 파일을 리스트로 변환
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {/* {loading ? <strong>Loading...</strong> : null} */}
      {/* <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
          </li>
        ))}
      </ul> */}
      {/* <select name="" id="">
        {coins.map((coin) => (
          <option key={coin.id}>
            {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
          </option>
        ))}
      </select> */}
      {/* 로딩바 옆에 select태그가 보여서 안이쁨 */}
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select name="" id="">
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
