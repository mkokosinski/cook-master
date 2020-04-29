import React from "react"
import { Link } from "gatsby"
import styles from "./Footer.module.scss"
import { tips, recipes,addRecipe } from "../../helpers/menuLinks"

export const FooterMenu = ({items}) => {
  return (
    <div className={styles.menu}>
      <Link
        className={styles.btn}
        activeClassName={styles.btnActive}
        to={"/" + tips.slug}
      >
        {tips.name}
      </Link>
      <Link
        className={styles.btn}
        activeClassName={styles.btnActive}
        to={"/" + recipes.slug}
        >
          {recipes.name}
      </Link>
    </div>
  )
}
