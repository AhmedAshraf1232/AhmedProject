import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import { useData } from "../context/DataProvider";
import { Link } from "react-router-dom";

function Login() {
  const { setUserName, setUserPassword, handleLogin } = useData();

  return (
    <div className={styles.parent}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.loginText}></div>
        <form onSubmit={handleLogin} className={styles.form}>
          <FontAwesomeIcon icon={faUser} size="4x" className={styles.icon} />
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className={styles.loginInput}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            className={styles.loginInput}
            onChange={(e) => setUserPassword(e.target.value)}
          />

          <button className={styles.btnLogin}>Login</button>
          <p className={styles.signupbtn}>
            {" "}
            OR
            <Link to="/signup" className={styles.signupLink}>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
