// bash에서 npm i prop-types
// PropTypes import
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Btn({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

// propTypes 정의
Btn.propTypes = {
  text: PropTypes.string.isRequired,
};

// Btn을 export하는 코드
export default Btn;
