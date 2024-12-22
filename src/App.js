import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Homepage/HomePage";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PageNotFound from "./Components/PageNotFound";
import Main from "./Components/MainApp/MainApp";
import { BookProvider } from "./context/BooksContext";
import BookDetails from "./Components/BookDetail/BookDetails";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="books" element={<ProtectedRoute><Main /></ProtectedRoute>}>
              <Route path=":id" element={<BookDetails />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </BookProvider> 
    </AuthProvider>
    
  );
}

export default App;
