import { useState } from "react";
import styles from "./Signup.module.css";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {createUser, users} = useAuth()

  function findUser(email){
    const result = users?.map(user=>user.email).includes(email)
    return result;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(users)
    const newUser = {
      id:Date.now(),
      name,
      email,
      password,
      borrowedBooks:[],
      role:"member"
    };
    if(name === "" || email === "" || password === "") {
      alert("please kindly signup by entering your details 😣🙄")
      return
    }
    if(findUser(email)) {
      alert(`${email} already exist`)
      return
    }
    
    createUser(newUser)
    alert(`${name} (${email}) added sucessfully`);
    navigate("/login")
    setName("");
    setEmail("");
    setPassword("");
    
  }
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <div className={styles.formContent}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className={styles.formContent}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="enter your email id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.formContent}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="enter your name"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={styles.btnContainer}>
            <button>Submit</button>
            <p>Already registered? <NavLink to="/login">Login</NavLink></p>
          </div>
        </form>
        <div className={styles.iconContainer}>
          <img src="/booksPhoto/lady.jpg" alt="lady reading a book" />
        </div>
      </div>
    </section>
  );
}

export default Signup;
