import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`${styles.navBar} ${
        isHomePage ? styles.homeNav : styles.defaultNav
      }`}
    >
      <div
        className={styles.logo}
        onClick={() => navigate("/")}
      >
        AhmedProject
      </div>

      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
