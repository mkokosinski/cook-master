import React from "react"
import { Link } from "gatsby"
import styles from "./Footer.module.scss"

export const FooterMenu = ({items}) => {
  return (
    <div className={styles.menu}>
      <Link
        className={styles.btn}
        activeClassName={styles.btnActive}
        to="/app/Tips"
      >
        Porady
      </Link>
      <Link
        className={styles.btn}
        activeClassName={styles.btnActive}
        to="/app/Recipes"
      >
        Przepisy
      </Link>
      <Link
        className={styles.btn}
        activeClassName={styles.btnActive}
        to="/app/AddRecipe"
      >
        Dodaj przepis
      </Link>
    </div>
  )
}
