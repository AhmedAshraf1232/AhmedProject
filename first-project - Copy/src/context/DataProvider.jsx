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
      return { user: action.payload, isAuthenticated: true };

    case "logout":
      return { user: null, isAuthenticated: false };
    case "taskAdd": {
      const updatedUser = {
        ...state.user,
        tasks: [...state.user.tasks, action.payload],
      };
      // localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };
    }
    case "deleteTask":
      const deletedTask = {
        ...state.user,
        tasks: state.user.tasks.filter((task) => task.id !== action.payload),
      };
      return { ...state, user: deletedTask };
    default:
      throw new Error("Unknown action");
  }
}

function DataProvider({ children }) {
  const [{ user }, dispatch] = useReducer(reduce, initValue);
  const [userName, setUserName] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [nameDescribtion, setNameDescribtion] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [newUser, setNewUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();

  // reset data input
  function reset() {
    setUserName("");
    setUserPassword("");
  }

  //  handling Login
  function handleLogin(e) {
    e.preventDefault();

    const foundUser = users.find(
      (u) => u.email === userName && u.password === userPassword,
    );

    if (foundUser) {
      dispatch({ type: "login", payload: foundUser });
      localStorage.setItem("user", JSON.stringify(foundUser));
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

  async function addNewTask() {
    if (!user) return;

    const newTask = {
      id: Date.now(),
      taskName: nameValue,
      description: nameDescribtion,
    };

    const updatedUser = {
      ...user,
      tasks: [...user.tasks, newTask],
    };

    try {
      console.log(user);
      const res = await fetch(`http://localhost:9000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks: updatedUser.tasks }),
      });

      const savedUser = await res.json();

      dispatch({ type: "login", payload: savedUser });
      localStorage.setItem("user", JSON.stringify(savedUser));

      setNameValue("");
      setNameDescribtion("");
      setAddTask(false);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  }
  async function deleteTask(id) {
    const updatedTasks = user.tasks.filter((task) => task.id !== id);

    const res = await fetch(`http://localhost:9000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: updatedTasks }),
    });

    const updatedUser = await res.json();

    // Update state (reducer) & localStorage
    dispatch({ type: "login", payload: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

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

  async function addUser(e) {
    e.preventDefault();

    const userExists = users.some((u) => u.email === newEmail);
    if (userExists) {
      alert("Email already exists");
      return;
    }

    const newUserData = {
      id: Date.now().toString(),
      name: newUser,
      email: newEmail,
      password: newPassword,
      tasks: [],
    };

    try {
      const res = await fetch("http://localhost:9000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      const savedUser = await res.json();

      setUsers((prev) => [...prev, savedUser]);

      dispatch({ type: "login", payload: savedUser });
      localStorage.setItem("user", JSON.stringify(savedUser));

      navigate("/app");
    } catch (err) {
      console.error("Failed to signup", err);
    }
  }

  return (
    <DataContext.Provider
      value={{
        user,
        userName,
        setUserName,
        userPassword,
        setUserPassword,
        handleLogin,
        handleLogout,
        addTask,
        setAddTask,
        setNameDescribtion,
        setNameValue,
        addNewTask,
        searchText,
        setSearchText,
        deleteTask,
        addUser,
        setNewUser,
        setNewEmail,
        setNewPassword,
        newPassword
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
