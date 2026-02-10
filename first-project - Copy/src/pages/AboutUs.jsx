import NavBar from "../component/NavBar";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <div className={styles.center}>
      <div className={styles.aboutContainer}>
        <h1>About Task Management App</h1>
        <p>
          This Task Management App is a simple and efficient tool to help you
          organize your daily tasks. You can add tasks, track their status, and
          stay productive without any distractions.
        </p>

        <div className={styles.features}>
          <h2>Features</h2>
          <ul>
            <li>Add new tasks with name and description</li>
            <li>Search and filter tasks quickly</li>
            <li>Edit or delete tasks when needed</li>
            <li>Organize tasks efficiently with a clean interface</li>
          </ul>
        </div>

        <div className={styles.goal}>
          <h2>Project Goal</h2>
          <p>
            The goal of this project is to create a fully functional Task
            Management application using React. This project demonstrates the
            use of React concepts like useState, useReducer, useEffect, Context
            API, and routing. It is a perfect example for beginners to
            understand React workflow while building something useful.
          </p>
        </div>

        <div className={styles.tech}>
          <h2>Technology Used</h2>
          <p>
            Built with React, CSS Modules, and React Router. This project
            focuses on frontend development and interactive user experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
