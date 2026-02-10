import styles from "./Content.module.css";
import Task from "./Task";
function Content() {

  return (
    <div className={styles.content}>
        <Task/>
    </div>
  );
}

export default Content;
