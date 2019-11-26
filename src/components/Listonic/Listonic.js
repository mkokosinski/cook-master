import React, { useRef, useEffect } from "react"

// import './listonicFunctions'

import styles from "./Listonic.module.scss"

const Listonic = ({ closeListonic, title, ingredients }) => {
  let iframeRef = useRef(null)
  const test = (e) =>{
    console.log(iframeRef);
    var body= iframeRef.current.contentWindow.document
    console.log(body);
}

// useEffect(() => {
//   effect
//   return () => {
//     cleanup
//   };
// }, [input])
  const api = "https://app.listonic.com/widget.html#!/widget/"
  const site = "https:%252f%252fcook-master.netlify.com%252fprzepis%252f"
  const ingredientsNames = ingredients.map(ingr => ingr.name)
  const uri = `${api}${site}${title.replace(/ /g, "-")}/${encodeURI(
    title
  )}/${encodeURI(ingredientsNames.join("%3CBR%3E"))}`
  return (
    <div className={styles.container}>
      <button className={styles.closeBtn} onClick={test}></button>
      <iframe ref={iframeRef} src={uri} onLoad={test} frameBorder="0"></iframe>
      
    </div>
  )
}

export default Listonic
