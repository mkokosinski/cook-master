import React, { useRef, useEffect } from "react"

import styles from "./ListonicButton.module.scss"

import { html } from "./ListonicFrameContent"

const Listonic = ({ className, recipeTitle, ingredients }) => {
  let frame = useRef(null)
  useEffect(() => {
    if (frame.current != null) {
      const doc = frame.current.contentWindow.document
      doc.open()
      doc.write(html(ingredients, recipeTitle, styles))
      doc.close()
    }
  }, [])
  return (
    <button className={className}>
      <iframe
        title="test"
        ref={frame}
        scrolling="no"
        className="test"
        frameBorder="0"
      ></iframe>
      <div className={styles.buttonLabel}>Listonic</div>
    </button>
  )
}

export default Listonic
