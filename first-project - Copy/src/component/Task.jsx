import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./Task.module.css";
import { useData } from "../context/DataProvider";

function Task() {
  const [open, setOpen] = useState(true);
  const { user, searchText, deleteTask } = useData();
  const { tasks } = user;

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      {filteredTasks.map((task) => (
        <div className={styles.task} key={task.id}>
          <h3>{task.taskName}</h3>

          <p>
            {open ? `${task.description.slice(0, 80)}...` : task.description}
            <button className={styles.btnTask} onClick={() => setOpen(!open)}>
              see more
            </button>
          </p>

          <button className={styles.deleteBtn} onClick={()=>deleteTask(task.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </>
  );
}

export default Task;
