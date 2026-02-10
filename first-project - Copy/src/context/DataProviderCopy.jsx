import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

const initValue = {
  user: JSON.parse(localStorage.getItem("user")),
  isAuthenticated: !!localStorage.getItem("user"),
};

function reduce(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload, isAuthenticated: true };

    case "logout":
      localStorage.removeItem("user");
      return { user: null, isAuthenticated: false };
    case "taskAdd": {
      const updatedUser = {
        ...state.user,
        tasks: [...state.user.tasks, action.payload],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return {
        ...state,
        user: updatedUser,
      };
    }
    default:
      throw new Error("Unknown action");
  }
}

function DataProvider({ children }) {
  const [{ user, isAthunticate }, dispatch] = useReducer(reduce, initValue);
  const [userName, setUserName] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [nameDescribtion, setNameDescribtion] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // reset data input
  function reset() {
    setUserName("");
    setUserPassword("");
  }

  //  handling Login
  function handleLogin(e) {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));
    let foundUser = null;
    if (
      savedUser &&
      savedUser.email === userName &&
      savedUser.password === userPassword
    ) {
      foundUser = savedUser;
    } else {
      foundUser = users.find(
        (u) => u.email === userName && u.password === userPassword,
      );
    }

    if (foundUser) {
      dispatch({ type: "login", payload: foundUser });
      navigate("/app");
      reset();
    } else {
      alert("Wrong email or password");
    }
  }

  function handleLogout() {
    dispatch({ type: "logout" });
    navigate("/login");
  }
  function addNewTask() {
    const newTask = {
      id: Date.now(),
      taskName: nameValue,
      description: nameDescribtion,
    };

    dispatch({ type: "taskAdd", payload: newTask });

    setNameValue("");
    setNameDescribtion("");
    setAddTask(false);
  }
  function deleteTask() {}

  useEffect(() => {
    async function usersData() {
      try {
        const res = await fetch("http://localhost:9000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }

    usersData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        userName,
        setUserName,
        userPassword,
        setUserPassword,
        isAthunticate,
        handleLogin,
        handleLogout,
        addTask,
        setAddTask,
        setNameDescribtion,
        setNameValue,
        addNewTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
function useData() {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error("Something Wronge in context Api");
  return context;
}

export { DataProvider, useData };
