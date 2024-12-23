import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import { useEffect } from "react";
import { useBook } from "../../context/BooksContext";
import Loader from "../Loader/Loader";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
function BookDetails() {
  const { id } = useParams();
  const { getBook, isLoading, currentBook } = useBook();
  const { currentUser, updateUser, dispatch } = useAuth();
  const [isBorrowed, setIsBorrowed] = useState(false);

  const { title, details, author } = currentBook;
  useEffect(
    function () {
      getBook(id);
    },
    [id]
  );

  function handleBorrowBook(id) {
    dispatch({ type: "borrowed/book", payLoad: id });
  }
  useEffect(
    function () {
      setIsBorrowed(
        currentUser.borrowedBooks.includes(currentBook.id) ? true : false
      );
      updateUser(currentUser.id, currentUser.borrowedBooks)
    },
    [currentUser.borrowedBooks, currentBook.id, updateUser, currentUser.id]
  );
  if (isLoading) return <Loader />;
  return (
    <div className={styles.bookDetails}>
      <img src={currentBook.photo} alt={currentBook.title} />
      <p>
        <strong>{title}</strong> written by <strong>{author}</strong>
      </p>
      <p className={styles.details}>{details}</p>
      <button
        className={styles.btnBorrow}
        disabled={isBorrowed}
        onClick={() => handleBorrowBook(currentBook.id)}
      >
        Borrow this book
      </button>
      {isBorrowed && (
        <button
          className={styles.btnReturn}
          onClick={() =>
            dispatch({ type: "return/book", payLoad: currentBook.id })
          }
        >
          Return this book
        </button>
      )}
    </div>
  );
}

export default BookDetails;
