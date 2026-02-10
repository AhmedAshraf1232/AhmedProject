import styles from "./AddTaskinfo.module.css";
import { useData } from "../context/DataProvider";
function AddTaskinfo({ setAddTask }) {
  const {setNameValue, setNameDescribtion, addNewTask } = useData();
  function closeBtn() {
    setAddTask(false);
  }
  return (
    <>
      <div className={styles.overlay}></div>

      <div className={styles.newTask}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            placeholder="Task Name"
            onChange={(e) => setNameValue(e.target.value)}
          />

          <label>Description</label>
          <input
            type="textarea"
            placeholder="Task Description"
            onChange={(e) => setNameDescribtion(e.target.value)}
          />
        </div>

        <div className={styles.btnbox}>
          <button className={styles.btnAddTask} onClick={addNewTask}>
            Add
          </button>
          <button className={styles.btnCloseTask} onClick={closeBtn}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTaskinfo;
