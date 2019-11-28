import React, { useRef, useEffect } from "react"


import styles from "./Listonic.module.scss"

import {html} from './ListonicButton'



const Listonic = ({ closeListonic, title, ingredients }) => {
  let frame = useRef(null)
  const api = "https://app.listonic.com/widget.html#!/widget/"
  const site = "https:%252f%252fcook-master.netlify.com%252fprzepis%252f"
  const ingredientsNames = ingredients.map(ingr => ingr.name)
  const uri = `${api}${site}${title.replace(/ /g, "-")}/${encodeURI(
    title
  )}/${encodeURI(ingredientsNames.join("%3CBR%3E"))}`

  useEffect(() => {
    if (frame.current != null) {
        const doc = frame.current.contentWindow.document;
        doc.open()
        doc.write(
         html(ingredients, title, styles)
        )
        doc.close()
        console.log(ingredients);
        
        console.log(doc);
        

        // doc.querySelector('.listonic-button').className=styles.test;
        
    }
  }, [])
  return (
    <div className={styles.container}>
      <iframe
        title="test"
        ref={frame}
        scrolling="no"
        className="test"
        frameBorder="0"
      ></iframe>
    </div>
  )
}

export default Listonic
