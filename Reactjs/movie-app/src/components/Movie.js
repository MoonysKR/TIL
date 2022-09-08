import PropTypes from "prop-types";
// a태그처럼 보내주지만, 새로고침하지 않음
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div>
      <img src={coverImg} alt={title}></img>
      <p>
        <Link to={`/movie/${id}`}>{title}</Link>
      </p>
      <p>{summary}</p>
      <ul>
        {/* for문 두번 돌리기 */}
        {genres.map((genre) => (
          <li key={genre}> {genre} </li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
