
import Book from "../../Components/Book/Book";
import { useBook } from "../../context/BooksContext";
import styles from "./Books.module.css"
function Books() {
  const { books } = useBook();
  
  return (
    <div>
      <ul className={styles.bookContainer}>
        {books.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </ul>
    </div>
  );
}

export default Books;
