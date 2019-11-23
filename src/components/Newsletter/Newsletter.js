import React from "react"
import styles from "./Newsletter.module.scss"

export const Newsletter = () => {
  return (
    <div className={styles.mock}>
      <div className="field">
        <label className="label">NEWSLETTER</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
        </div>
      </div>
    </div>
  )
}
