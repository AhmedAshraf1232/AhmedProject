import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useData } from "../context/DataProvider";
import { useState } from "react";

function SignUp() {
  const { addUser, newPassword, setNewUser, setNewEmail, setNewPassword } =
    useData();
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  function handleSubmit(e) {
    console.log(password,confirmPassword);
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setNewPassword(password);
    addUser(e);
  }

  return (
    <div className={styles.signContainer}>
      <div className={styles.signUpContainer}>
        <div className={styles.signupText}>
          <h3>Come Join us!</h3>
          <p>
            We are so excited to have you her .if you haven't already. create an
            acount to get access to exclusive offers and rewards
          </p>
          <p className={styles.backlogin}>
            Already have an Account?<Link to="/login">Login</Link>
          </p>
        </div>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" onChange={(e) => setNewUser(e.target.value)} />
          <label>Email:</label>
          <input type="email" onChange={(e) => setNewEmail(e.target.value)} />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className={styles.signupBtn}>Sign Up</button>

          <p>Or Signup with</p>
          <div className={styles.socialIcons}>
            <button className={styles.facebook}>
              <FaFacebookF />
            </button>

            <button className={styles.google}>
              <FaGoogle />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
