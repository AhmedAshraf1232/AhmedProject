import styles from "./SideBar.module.css";
import avatar from "../assets/man.png";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleInfo,
  faEnvelope,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { user, handleLogout } = useData();
  const navigate = useNavigate();
  return (
    <div className={styles.sideBar}>
      <div className={styles.idContainer}>
        <div className={styles.idContent}>
          <img src={avatar} alt="" />
          <p>{user.name}</p>
        </div>
      </div>
      <ul className={styles.sideBarList}>
        <li className={styles.home} onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </li>
        <li className={styles.about} onClick={() => navigate("/about")}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>About Us</span>
        </li>
        <li className={styles.contact}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Contact Us</span>
        </li>
      </ul>
      <Button btnStyle={styles.btnMain} existClick={handleLogout}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ marginRight: "8px" }}
        />
        Log Out
      </Button>
    </div>
  );
}

export default SideBar;
