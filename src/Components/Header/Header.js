import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";


function Header({ handleClick }) {
  const { currentUser } = useAuth();
  return (
    <header className={styles.header}>
      <p>
        Welcome <span>{currentUser.name}</span>
      </p>
      <button onClick={handleClick}>Logout</button>
    </header>
  );
}

export default Header;
