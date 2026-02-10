import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import HomePage from "./component/HomePage";
import Layout from "./pages/Layout";
import { DataProvider } from "./context/DataProvider";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<Layout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
