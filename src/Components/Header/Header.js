import { useAuth } from "../../context/AuthContext";
import { useBook } from "../../context/BooksContext";
import styles from "./Header.module.css";

function Header({ handleClick }) {
  const { currentUser } = useAuth();
  const { dispatch } = useBook();
  const numOfBooksBorrowed = currentUser.borrowedBooks.length;
  return (
    <header className={styles.header}>
      <p>
        Welcome <span>{currentUser.name}</span>
      </p>
      <input
        type="text"
        placeholder="Search a Book"
        onChange={(e) =>
          dispatch({ type: "book/searched", payLoad: e.target.value })
        }
      />
      <p className={styles.booksBorrowed}>
        Borrowed Books: <span>{numOfBooksBorrowed}</span>
      </p>
      <button onClick={handleClick}>Logout</button>
    </header>
  );
}

export default Header;
