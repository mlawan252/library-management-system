import Nav from "../../Components/Nav/Nav";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <div>
      <Nav />
      <section className={styles.section}>
        <div className={styles.contents}>
          <h1>Welcome to Muhammad Lawan online Book Store</h1>
          <p>
            Reading books opens doors to endless knowledge and imagination,
            empowering the mind to explore new horizons. Each page holds the
            power to inspire, educate, and transform perspectives. Dive into a
            book today; it’s a journey where every word enriches your soul. The
            more you read, the more
          </p>
          <button>Go to Collections ➡️</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
