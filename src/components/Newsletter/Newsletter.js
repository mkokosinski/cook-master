import React from "react"
import styles from "./Newsletter.module.scss"

export const Newsletter = () => {
  return (
    <div className={styles.mock}>
      <div className="field">
        <label className="label" htmlFor="newsletterEmail">
          NEWSLETTER
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="newsletterEmail"
            placeholder="Text input"
          />
        </div>
      </div>
    </div>
  )
}
