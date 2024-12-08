import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css"
function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/books">Books</NavLink>
      <NavLink to="/login" className={styles.login}>Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </nav>
  );
}
export default Nav;