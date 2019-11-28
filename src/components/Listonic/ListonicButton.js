import React, { useRef, useEffect, useState } from "react"

import BallLoader from "../Loader/BallLoader"
import { html } from "./ListonicFrameContent"

import styles from "./ListonicButton.module.scss"

const Listonic = ({ className, recipeTitle, ingredients }) => {
  const [isDisabled, setIsDisabled] = useState(true)
  let frame = useRef(null)
  useEffect(() => {
    if (frame.current != null) {
      const doc = frame.current.contentWindow.document
      doc.open()
      doc.write(html(ingredients, recipeTitle, styles))
      doc.close()
      setIsDisabled(false)
    }
  }, [])
  return (
    <button className={className} disabled={isDisabled}>
      <iframe
        disabled={isDisabled}
        title="test"
        ref={frame}
        scrolling="no"
        className="test"
        frameBorder="0"
      ></iframe>
      <div className={styles.buttonLabel}>Listonic</div>
      <div className={styles.loader}>
        {isDisabled && <BallLoader style={{ height: "500px" }} />}
      </div>
    </button>
  )
}

export default Listonic
