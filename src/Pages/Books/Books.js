import { useEffect, useState } from "react";
import Book from "../../Components/Book/Book";
import { useBook } from "../../context/BooksContext";
import styles from "./Books.module.css";
function Books() {
  const { books, searchedBook } = useBook();
  const [searchedBooks, setSearchedBooks] = useState([]);
  useEffect(
    function () {
      setSearchedBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(searchedBook.toLowerCase())
        )
      );
    },
    [searchedBook, books]
  );
  return (
    <div>
      <ul className={styles.bookContainer}>
        {searchedBook.length > 0
          ? searchedBooks.map((book) => <Book book={book} key={book.id} />)
          : books.map((book) => <Book book={book} key={book.id} />)}
      </ul>
    </div>
  );
}
// {books.map((book) => (
//   <Book book={book} key={book.id} />
// ))}

export default Books;
