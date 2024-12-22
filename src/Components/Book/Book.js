import { Link } from "react-router-dom";
import styles from "./Book.module.css";

function Book({ book }) {
  const { title, photo, author, id } = book;

  return (
    <li className={styles.book}>
      <Link to={`${id}?title=${title}`}>
        <img src={photo} alt={id} className={styles.photo} />
        <p>{title}</p>
        <p>
          <strong>{author.map((a) => a)}</strong>
        </p>
      </Link>
    </li>
  );
}

export default Book;
