import { createContext, useContext, useEffect, useReducer } from "react";

const bookContext = createContext();
const initialState = { books: [], isLoading: false, error: "", currentBook:{} };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "books/loaded":
      return { ...state, isLoading: false, books: action.payLoad };
    case "rejected":
      return { ...state, isLoading: false, error: action.payLoad };
    case "book/loaded":
      return {...state,  isLoading:false, currentBook:action.payLoad}
    default:
      throw new Error("Unknown action");
  }
}
function BookProvider({children}) {
  useEffect(function () {
    async function getBooks() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:9000/books");
        const data = await res.json();
        dispatch({ type: "books/loaded", payLoad: data });
      } catch {
        dispatch({ type: "rejected", payLoad: "Unable to fetch books" });
      }
    }
    getBooks()
  }, []);
   
  async function getBook(id){
      dispatch({type:"loading"})
      try {
        const res = await fetch(`http://localhost:9000/books/${id}`);
        const data = await res.json();
        dispatch({ type: "book/loaded", payLoad: data });
      } catch {
        dispatch({ type: "rejected", payLoad: "Unable to fetch book" });
      }
    }
  

  const [{ books, isLoading, error, currentBook }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <bookContext.Provider value={{ books, isLoading, error, currentBook, getBook }}>
      {children}
    </bookContext.Provider>
  );
}

function useBook() {
  const context = useContext(bookContext);
  if (context === undefined) throw new Error("Context out of reach");
  return context;
}
export { BookProvider, useBook };
