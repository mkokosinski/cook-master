import React from "react"
import SearchInput from "../SearchInput/SearchInput"
import { Link } from "gatsby"

import TipsImg from "../../images/chef.svg"
import RecipeImg from "../../images/recipe-book.svg"
import BackgoundImg from "../../images/bg.svg"
import { tips, recipes } from "../../helpers/menuLinks"
import styles from "./HomePage.module.scss"
import "./BackgroundAnimations.scss"

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.background}>
        <BackgoundImg />
      </div>
      <div className={`card ${styles.seachDialog}`}>
        <label htmlFor="seachInput">Wpisz co Cię interesuje:</label>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
      </div>
      <div className={styles.newses}>
        <div className="card">
          <Link className={styles.news} to={"/" + tips.slug}>
            <TipsImg />
            {tips.name}
          </Link>
        </div>
        <div className="card">
          <Link className={styles.news} to={"/" + recipes.slug}>
            <RecipeImg />
            {recipes.name}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
