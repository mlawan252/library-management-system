import styles from "../BookDetail/BookDetails.module.css"

function Loader(){
    return(
        <div className={styles.bookDetails}>
        <p>Loading...</p>
    </div>
    )
   
    
}

export default Loader;