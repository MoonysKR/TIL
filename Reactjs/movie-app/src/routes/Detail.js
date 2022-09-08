// 라우터로 오는 id 잡아내기
// 리액트에서 잡아주는 useParams
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  // params에서 id 가져오기
  const { id } = useParams();

  // 요청을 보내고 json파일 처리
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
  };

  // 처음 한번만 실행할 함수
  useEffect(() => {
    getMovie();
  }, []);

  // 렌더링할 부분
  return <h1>Detail</h1>;
}

export default Detail;
