import { Outlet, useNavigate } from "react-router-dom";
import Books from "../../Pages/Books/Books";
import styles from "./MainApp.module.css";
import { useAuth } from "../../context/AuthContext";
import Header from "../Header/Header";

function Main() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  function handleClick() {
    dispatch({ type: "logout" });
    navigate("/");
  }
  return (
    <div>
      <Header handleClick={handleClick} />
      <div className={styles.container}>
        <Books />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
