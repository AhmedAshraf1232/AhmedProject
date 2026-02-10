import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import NavBar from "./NavBar";
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <NavBar />
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h1>The Best Way To Organize your System</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis molestiae quae est incidunt sunt, omnis dolores
              corporis doloremque at deserunt ipsa voluptatibus suscipit,
              itaque, sit dolorem tempora. Aperiam, distinctio quaerat.
            </p>
            <button onClick={() => navigate("/login")}>
              Click her to login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
