import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const { email, password, checkUser, dispatch } = useAuth();
  const navigate = useNavigate();

  
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "login" });
   
    if (checkUser(email, password)) navigate("/books");
    if (!checkUser(email, password))
      alert(
        "Either your login details are incorrect or you are not a registered member"
      );  
    
  }
  return (
    <div className={styles.container}>
      <div className={styles.bookIcon}>
        <img src="/booksPhoto/unsplash-book.jpg" alt="book" />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>LOG IN</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            dispatch({ type: "email/login", payLoad: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) =>
            dispatch({ type: "password/login", payLoad: e.target.value })
          }
        />
        <button>Log In</button>
        <p>Not a user? <NavLink to="/signup">Signup Now!</NavLink></p>
      </form>
    </div>
  );
}

export default Login;
