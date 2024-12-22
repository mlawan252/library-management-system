import { createContext, useContext, useReducer, useEffect } from "react";

const authContext = createContext();
const initialState = {
  users: [],
  currentUser: {},
  email: "",
  password: "",
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "data/loaded":
      return { ...state, users: action.payLoad };
    case "email/login":
      return { ...state, email: action.payLoad };
    case "password/login":
      return { ...state, password: action.payLoad };
    case "borrowed/book":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          borrowedBooks: [...state.currentUser.borrowedBooks, action.payLoad],
        },
      };
    case "return/book":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          borrowedBooks: state.currentUser.borrowedBooks.filter(id => id !== action.payLoad),
        },
      };
    case "login":
      return { ...state, isAuthenticated: true, currentUser: action.payLoad };
    case "logout":
      return { ...state, isAuthenticated: false, email: "", password: "" };
    default:
      throw new Error("Unknown action");
  }
}
function AuthProvider({ children }) {
  const [{ email, password, isAuthenticated, currentUser, users }, dispatch] =
    useReducer(reducer, initialState);
  useEffect(function () {
    async function getUsers() {
      const res = await fetch("http://localhost:9000/users");
      const data = await res.json();
      dispatch({ type: "data/loaded", payLoad: data });
    }
    getUsers();
  }, [users]);

  async function createUser(newUser) {
    const res = await fetch("http://localhost:9000/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({ type: "data/loaded", payLoad: data });
  }
  async function updateUser(userId, borrowedBooks) {
    try {
      await fetch(`http://localhost:9000/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ borrowedBooks }),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to update user's borrowed books:", error);
    }
  }
  
  
  function checkUser(email, password) {
    const user = users?.filter(
      (user) => user.email === email && user.password === password
    );
    dispatch({ type: "login", payLoad: user[0] });
    return user[0];
  }
  return (
    <authContext.Provider
      value={{
        email,
        password,
        isAuthenticated,
        users,
        currentUser,
        createUser,
        updateUser,
        checkUser,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  if (context === undefined)
    throw new Error("The context is used outhside the authProvider");
  return context;
}
export { AuthProvider, useAuth };
