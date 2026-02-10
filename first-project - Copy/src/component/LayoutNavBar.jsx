import styles from "./LayoutNavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AddTaskinfo from "./AddTaskinfo";
import { useData } from "../context/DataProvider";

function LayoutNavBar() {
  const {addTask,setAddTask,setSearchText} = useData()
  return (
    <div className={styles.navLayout}>
      <p className={styles.logo}>AhmedProjects</p>

      <div className={styles.inputWrapper}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.searchIcon}
        />
        <input
          type="text"
          className={styles.navInput}
          placeholder="Search..."
          onChange={(e)=>setSearchText(e.target.value)}
        />
      </div>

      <button className={styles.navBtn} onClick={()=>setAddTask(true)}>Add Task</button>
      {addTask &&<AddTaskinfo setAddTask={setAddTask}/>}
    </div>
  );
}

export default LayoutNavBar;
